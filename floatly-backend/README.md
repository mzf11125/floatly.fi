# Floatly.fi Backend API

Complete backend implementation for Floatly.fi with IOTA Notarization and Identity services.

## 🚀 Features

- **IOTA Notarization**: Document hashing, verification, and blockchain storage
- **Dynamic Notarizations**: Mutable documents that can be updated and transferred
- **Locked Notarizations**: Immutable records for permanent audit trails
- **Wallet Management**: Secure key handling with Stronghold
- **Testnet Integration**: Connected to IOTA testnet for development
- **JWT Authentication**: Ready for secure API access
- **Rate Limiting**: Protection against abuse
- **CORS Support**: Configured for frontend integration

## 📋 Prerequisites

- Node.js 18+ or Node.js 20 LTS
- npm or pnpm package manager
- IOTA testnet access
- IOTA wallet with testnet tokens (auto-generated if not provided)

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd floatly-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` and set:
   ```env
   # IOTA Configuration
   IOTA_NOTARIZATION_PKG_ID=your-package-id-here
   NETWORK_URL=https://api.testnet.iota.org:443
   
   # Wallet (optional - will auto-generate if not provided)
   PRIVATE_KEY=your-private-key-here
   
   # Server
   PORT=3001
   NODE_ENV=development
   
   # JWT
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

## 🏃 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Health & System

- `GET /` - API documentation and endpoint list
- `GET /api/notarizations/health` - Health check with wallet info
- `GET /api/notarizations/wallet/info` - Wallet balance and address

### Notarization Operations

#### File Hashing
```bash
POST /api/notarizations/hash
Content-Type: multipart/form-data

# Upload a file and get SHA-256 hash
curl -X POST http://localhost:3001/api/notarizations/hash \
  -F "file=@document.pdf"
```

#### Create Dynamic Notarization
```bash
POST /api/notarizations/dynamic
Content-Type: application/json

{
  "content": "64-char-sha256-hash",
  "metadata": "Loan Agreement #12345",
  "description": "Monthly loan repayment agreement",
  "transferLock": {
    "unlockAt": 1735689600  // Unix timestamp (optional)
  }
}
```

#### Create Locked Notarization (Immutable)
```bash
POST /api/notarizations/locked
Content-Type: application/json

{
  "content": "64-char-sha256-hash",
  "metadata": "Final Credit Report",
  "description": "Merchant credit assessment",
  "deleteLock": {
    "unlockAt": 1767225600  // Far future timestamp
  }
}
```

#### Update Dynamic Notarization
```bash
PUT /api/notarizations/{notarizationId}/state
Content-Type: application/json

{
  "content": "new-64-char-sha256-hash",
  "metadata": "Updated metadata"
}
```

#### Transfer Ownership
```bash
POST /api/notarizations/{notarizationId}/transfer
Content-Type: application/json

{
  "recipientAddress": "iota1..."
}
```

#### Verify Notarization
```bash
POST /api/notarizations/verify
Content-Type: application/json

{
  "notarizationId": "0x...",
  "expectedContent": "64-char-sha256-hash"
}
```

#### Get Notarization Details
```bash
GET /api/notarizations/{notarizationId}
```

#### Delete Notarization
```bash
DELETE /api/notarizations/{notarizationId}
```

## 🔑 Wallet Setup

### Option 1: Auto-Generate (Development)
Leave `PRIVATE_KEY` empty in `.env`. The backend will:
1. Generate a new Ed25519 keypair
2. Print the private key to console
3. Request testnet tokens from faucet
4. Save keys to Stronghold file

**⚠️ Save the printed private key for production use!**

### Option 2: Use Existing Key
Set `PRIVATE_KEY` in `.env` with either:
- Bech32 format: `iotaprivkey1...`
- Base64 format: `base64-encoded-32-bytes`

## 📦 Project Structure

```
floatly-backend/
├── src/
│   ├── server.ts              # Express app entry point
│   ├── controllers/
│   │   └── notarizationController.ts  # Request handlers
│   ├── services/
│   │   ├── walletService.ts           # IOTA wallet management
│   │   └── notarizationService.ts     # Notarization logic
│   ├── routes/
│   │   └── notarizationRoutes.ts      # API route definitions
│   ├── middleware/
│   │   └── auth.ts                    # JWT authentication
│   └── utils/
│       └── crypto.ts                  # Hashing utilities
├── dist/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## 🧪 Testing with Postman

1. **Import Collection**: Use the endpoint examples above
2. **Set Environment Variables**:
   - `BASE_URL`: `http://localhost:3001`
   - `NOTARIZATION_ID`: (copy from creation response)

3. **Test Flow**:
   ```
   1. Health Check → Verify service is running
   2. Upload File → Get hash
   3. Create Dynamic Notarization → Save notarizationId
   4. Get Details → Verify creation
   5. Update State → Test mutability
   6. Verify → Confirm integrity
   ```

## 🔒 Security Notes

### For Development (Testnet)
- Auto-generated keys are acceptable
- Faucet tokens are free
- `.stronghold` files contain private keys (gitignored)

### For Production (Mainnet)
- **NEVER** commit private keys to Git
- Use hardware wallets or HSM for key storage
- Enable HTTPS only (`helmet` middleware configured)
- Change `JWT_SECRET` to a strong random value
- Set strict CORS origins
- Enable additional rate limiting
- Audit smart contracts before deployment

## 🐛 Troubleshooting

### "IOTA_NOTARIZATION_PKG_ID environment variable is required"
- Deploy the notarization smart contract to IOTA testnet
- Set the package ID in `.env`

### "Failed to request faucet funds"
- Check internet connection
- IOTA testnet faucet may be rate-limited
- Try again after a few minutes

### "Cannot update state of a locked notarization"
- Locked notarizations are immutable by design
- Use dynamic notarizations for updatable documents

### Port 3001 already in use
- Change `PORT` in `.env`
- Or kill the existing process: `lsof -ti:3001 | xargs kill`

## 🔗 Integration with Frontend

Update your Next.js frontend (floatly-mvp):

1. **Install dependencies:**
   ```bash
   cd floatly-mvp
   pnpm add axios @tanstack/react-query zustand
   ```

2. **Create API client** (`lib/api.ts`):
   ```typescript
   import axios from 'axios';
   
   export const api = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
     headers: {
       'Content-Type': 'application/json',
     },
   });
   ```

3. **Update environment** (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

## 📚 Next Steps

- [ ] Deploy IOTA notarization smart contract
- [ ] Implement IOTA Identity workflow (DID, VC, VP)
- [ ] Add database integration (PostgreSQL + Prisma)
- [ ] Implement user authentication endpoints
- [ ] Connect merchant loan application flow
- [ ] Add Shopify OAuth integration
- [ ] Deploy to production server

## 📄 License

ISC

## 🤝 Contributing

This is part of the Floatly.fi lending platform. For questions, contact the Floatly team.

---

**Built with:**
- [IOTA SDK](https://github.com/iotaledger/iota-sdk)
- [IOTA Notarization](https://www.npmjs.com/package/@iota/notarization)
- Express.js
- TypeScript
- Node.js
