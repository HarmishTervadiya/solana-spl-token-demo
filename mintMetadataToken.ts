import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { connection } from "./connection.ts";
import type { Keypair, PublicKey } from "@solana/web3.js";

export async function mintMetadataToken(
  payer: Keypair,
  mint: PublicKey,
  recipient: PublicKey,
  amount: number,
) {
  const recipientATA = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipient,
    false,
    "confirmed",
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );
  const tx = await mintTo(
    connection,
    payer,
    mint,
    recipientATA.address,
    payer.publicKey,
    amount,
    [],
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );
  return tx;
}
