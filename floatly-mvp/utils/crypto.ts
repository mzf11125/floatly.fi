/**
 * Client-side crypto utilities for Floatly.fi
 * Used for wallet operations and address derivation
 */

import * as ed25519 from '@noble/ed25519';
import { bech32 } from 'bech32';

/**
 * Generate a new Ed25519 keypair for wallet
 */
export async function generateKeyPair() {
  const privateKey = ed25519.utils.randomSecretKey();
  const publicKey = await ed25519.getPublicKey(privateKey);
  return { privateKey, publicKey };
}

/**
 * Sign a message using Ed25519 private key
 */
export async function signMessage(message: Uint8Array, privateKey: Uint8Array) {
  return await ed25519.sign(message, privateKey);
}

/**
 * Verify a signature using Ed25519 public key
 */
export async function verifySignature(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array
) {
  return await ed25519.verify(signature, message, publicKey);
}

/**
 * Convert public key to IOTA address (Bech32 format)
 */
export function publicKeyToAddress(publicKey: Uint8Array, prefix = 'iota'): string {
  const words = bech32.toWords(publicKey);
  return bech32.encode(prefix, words);
}

/**
 * Convert IOTA address to public key
 */
export function addressToPublicKey(address: string): Uint8Array {
  const { words } = bech32.decode(address);
  return new Uint8Array(bech32.fromWords(words));
}

/**
 * Format address for display (truncated)
 */
export function formatAddress(address: string, startChars = 8, endChars = 6): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
