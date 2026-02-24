import {
  getOrCreateAssociatedTokenAccount,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  transfer,
} from "@solana/spl-token";
import { connection } from "./connection.ts";
import type { Keypair, PublicKey } from "@solana/web3.js";

export async function transferToken(
  payer: Keypair,
  mint: PublicKey,
  recipient: PublicKey,
  amount: number,
  isToken2022: boolean = false,
) {
  const programId = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

  const sourceATA = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey,
    false,
    "confirmed",
    undefined,
    programId,
  );
  const recipientATA = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipient,
    false,
    "confirmed",
    undefined,
    programId,
  );

  const tx = await transfer(
    connection,
    payer,
    sourceATA.address,
    recipientATA.address,
    payer.publicKey,
    amount,
    undefined,
    {commitment: "confirmed"},
    programId,
  );

  console.log(`tx created at signature: `, tx);
  return tx;
}
