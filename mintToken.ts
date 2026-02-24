import { getOrCreateAssociatedTokenAccount, mintTo, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./connection.ts";
import type { Keypair, PublicKey } from "@solana/web3.js";

export async function mintToken(
  payer: Keypair,
  mint: PublicKey,
  recipient: PublicKey,
  amount: number,
  isToken2022: boolean = false,
) {
  const programId = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
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
  const tx = await mintTo(
    connection,
    payer,
    mint,
    recipientATA.address,
    payer.publicKey,
    amount,
    [],
    undefined,
    programId,
  );
  return tx;
}
