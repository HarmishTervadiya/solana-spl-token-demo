import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { connection } from './connection.ts';
import type { Keypair, PublicKey } from '@solana/web3.js';

export async function transferToken(
    payer: Keypair,
    mint: PublicKey,
    recipient: PublicKey,
    amount: number
) {
    const sourceATA = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey);
    const recipientATA = await getOrCreateAssociatedTokenAccount(connection, payer, mint, recipient);

    const tx = await transfer(
        connection,
        payer,
        sourceATA.address,
        recipientATA.address,
        payer.publicKey,
        amount
    );

    console.log(`tx created at signature: `, tx);
    return tx;
}
