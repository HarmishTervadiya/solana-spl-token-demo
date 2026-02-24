import { createMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./connection.ts";
import type { Keypair } from "@solana/web3.js";

export async function createTokenMint(payer: Keypair, mintAuthority: Keypair) {
  const mint = await createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    null,
    8,
    undefined,
    undefined,
    TOKEN_PROGRAM_ID,
  );
  console.log(`Mint create at: ${mint.toBase58()}`);
  return mint;
}
