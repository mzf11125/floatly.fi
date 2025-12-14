import { NotarizationClient, NotarizationClientReadOnly, TimeLock, State } from "@iota/notarization/node";
import { WalletService } from "./walletService";

export class NotarizationService {
  private walletService: WalletService;
  private notarizationClient: NotarizationClient | null = null;
  private notarizationReadOnly: NotarizationClientReadOnly | null = null;

  constructor() {
    this.walletService = new WalletService();
  }

  private async initializeClients(): Promise<void> {
    if (this.notarizationClient) return;

    const packageId = process.env.IOTA_NOTARIZATION_PKG_ID;
    if (!packageId) {
      throw new Error("IOTA_NOTARIZATION_PKG_ID environment variable is required");
    }

    console.log("🔄 Initializing notarization clients...");

    const iotaClient = this.walletService.getIotaClient();
    
    this.notarizationReadOnly = await NotarizationClientReadOnly.createWithPkgId(
      iotaClient,
      packageId
    );

    const keypair = this.walletService.getKeypair();

    // Ed25519Keypair should work directly as TransactionSigner
    // If it doesn't, we need to check IOTA SDK version compatibility
    this.notarizationClient = await NotarizationClient.create(
      this.notarizationReadOnly,
      keypair as any // Type assertion for compatibility
    );

    console.log("✅ Notarization clients initialized successfully");
  }

  private async getClient(): Promise<NotarizationClient> {
    if (!this.notarizationClient) {
      await this.initializeClients();
    }
    if (!this.notarizationClient) {
      throw new Error("Notarization client not initialized");
    }
    return this.notarizationClient;
  }

  private getReadOnly(): NotarizationClientReadOnly {
    if (!this.notarizationReadOnly) {
      throw new Error("Notarization read-only client not initialized");
    }
    return this.notarizationReadOnly;
  }

  // Create Dynamic Notarization
  async createDynamicNotarization(
    content: string,
    metadata: string,
    description?: string,
    transferLock?: { unlockAt?: number; untilDestroyed?: boolean }
  ): Promise<any> {
    const client = await this.getClient();

    let builder = client.createDynamic().withStringState(content, metadata);

    if (description) {
      builder = builder.withImmutableDescription(description);
    }

    if (transferLock?.unlockAt) {
      builder = builder.withTransferLock(TimeLock.withUnlockAt(transferLock.unlockAt));
    } else if (transferLock?.untilDestroyed) {
      builder = builder.withTransferLock(TimeLock.withUntilDestroyed());
    }

    const result = await builder.finish().buildAndExecute(client);

    return {
      notarizationId: result.output.id,
      transactionDigest: result.response.digest,
      type: "dynamic",
      timestamp: new Date()
    };
  }

  // Create Locked Notarization
  async createLockedNotarization(
    content: string,
    metadata: string,
    description?: string,
    deleteLock?: { unlockAt?: number }
  ): Promise<any> {
    const client = await this.getClient();
   
    let builder = client.createLocked().withStringState(content, metadata);

    if (description) {
      builder = builder.withImmutableDescription(description);
    }

    if (deleteLock?.unlockAt) {
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (deleteLock.unlockAt <= currentTime) {
        throw new Error("unlockAt timestamp must be in the future");
      }
      
      console.log(`🔒 Setting delete lock: UnlockAt ${new Date(deleteLock.unlockAt * 1000).toISOString()}`);
      builder = builder.withDeleteLock(TimeLock.withUnlockAt(deleteLock.unlockAt));
    } else {
      console.log("🔒 Setting delete lock: None (can destroy immediately)");
      builder = builder.withDeleteLock(TimeLock.withNone());
    }

    const result = await builder.finish().buildAndExecute(client);

    return {
      notarizationId: result.output.id,
      transactionDigest: result.response.digest,
      type: "locked",
      timestamp: new Date()
    };
  }

  // Update State
  async updateState(notarizationId: string, content: string, metadata: string): Promise<any> {
    const client = await this.getClient();
    
    // Check if notarization is locked before attempting update
    const details = await this.getNotarizationDetails(notarizationId);
    if (details.method === "Locked") {
      throw new Error("Cannot update state of a locked notarization - it is immutable");
    }

    const state = State.fromString(content, metadata);
    const result = await client
      .updateState(state, notarizationId)
      .buildAndExecute(client);

    return {
      transactionDigest: result.response.digest,
      timestamp: new Date()
    };
  }

  // Update Metadata
  async updateMetadata(notarizationId: string, metadata: string | undefined): Promise<any> {
    const client = await this.getClient();
    
    // Check if notarization is locked before attempting update
    const details = await this.getNotarizationDetails(notarizationId);
    if (details.method === "Locked") {
      throw new Error("Cannot update metadata of a locked notarization - it is immutable");
    }

    const result = await client
      .updateMetadata(metadata, notarizationId)
      .buildAndExecute(client);

    return {
      transactionDigest: result.response.digest,
      timestamp: new Date()
    };
  }

  // Transfer Notarization
  async transferNotarization(notarizationId: string, recipientAddress: string): Promise<any> {
    const client = await this.getClient();
    
    // Check if notarization is locked before attempting transfer
    const details = await this.getNotarizationDetails(notarizationId);
    if (details.method === "Locked") {
      throw new Error("Cannot transfer a locked notarization - it is non-transferable");
    }

    const result = await client
      .transferNotarization(notarizationId, recipientAddress)
      .buildAndExecute(client);

    return {
      transactionDigest: result.response.digest,
      timestamp: new Date()
    };
  }

  // Check if destruction is allowed
  async canDestroyNotarization(notarizationId: string): Promise<boolean> {
    await this.initializeClients();
    const readOnly = this.getReadOnly();
    return await readOnly.isDestroyAllowed(notarizationId);
  }

  // Destroy Notarization
  async destroyNotarization(notarizationId: string): Promise<any> {
    const client = await this.getClient();
    
    // Check if destruction is allowed first
    const canDestroy = await this.canDestroyNotarization(notarizationId);
    if (!canDestroy) {
      throw new Error("Cannot destroy notarization - it may be locked or have active delete locks");
    }

    const result = await client
      .destroy(notarizationId)
      .buildAndExecute(client);

    return {
      transactionDigest: result.response.digest,
      timestamp: new Date()
    };
  }

  // Get Notarization Details
  async getNotarizationDetails(notarizationId: string): Promise<any> {
    await this.initializeClients();
    const readOnly = this.getReadOnly();

    const [
      state,
      versionCount,
      description,
      metadata,
      createdAt,
      method,
      isTransferLocked,
      isUpdateLocked,
      isDestroyAllowed
    ] = await Promise.all([
      readOnly.state(notarizationId),
      readOnly.stateVersionCount(notarizationId),
      readOnly.description(notarizationId),
      readOnly.updatableMetadata(notarizationId),
      readOnly.createdAtTs(notarizationId),
      readOnly.notarizationMethod(notarizationId),
      readOnly.isTransferLocked(notarizationId),
      readOnly.isUpdateLocked(notarizationId),
      readOnly.isDestroyAllowed(notarizationId)
    ]);

    return {
      notarizationId,
      state: {
        content: state.data.toString(),
        metadata: state.metadata
      },
      versionCount: Number(versionCount),
      description,
      metadata,
      createdAt: new Date(Number(createdAt) * 1000).toISOString(),
      method,
      locks: {
        transferLocked: isTransferLocked,
        updateLocked: isUpdateLocked,
        destroyAllowed: isDestroyAllowed
      }
    };
  }

  // Verify Notarization
  async verifyNotarization(notarizationId: string, expectedContent: string): Promise<any> {
    await this.initializeClients();
    const readOnly = this.getReadOnly();
    
    try {
      const state = await readOnly.state(notarizationId);
      const actualContent = state.data.toString();
      
      return {
        verified: actualContent === expectedContent,
        notarizationId,
        expectedContent,
        actualContent,
        match: actualContent === expectedContent
      };
    } catch (error) {
      return {
        verified: false,
        notarizationId,
        error: "Notarization not found or inaccessible"
      };
    }
  }

  // Get Wallet Info
  async getWalletInfo(): Promise<any> {
    const balance = await this.walletService.getBalance();
    
    return {
      address: this.walletService.getAddress(),
      balance,
      network: "testnet",
      hasPrivateKey: !!process.env.PRIVATE_KEY
    };
  }

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const walletInfo = await this.getWalletInfo();
      return {
        success: true,
        status: "healthy",
        wallet: {
          address: walletInfo.address,
          balance: walletInfo.balance,
          hasPrivateKey: walletInfo.hasPrivateKey
        },
        network: "testnet",
        packageId: process.env.IOTA_NOTARIZATION_PKG_ID,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      };
    }
  }
}
