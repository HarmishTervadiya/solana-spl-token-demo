import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { connection } from './connection.ts';
import type { Keypair, PublicKey } from '@solana/web3.js';

export async function mintToken(
    payer: Keypair,
    mint: PublicKey,
    recipient: PublicKey,
    amount: number
) {
    const recipientATA = await getOrCreateAssociatedTokenAccount(connection, payer, mint, recipient);
    const tx = await mintTo(connection, payer, mint, recipientATA.address, payer.publicKey, amount);
    return tx;
}
