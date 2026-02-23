import { createTokenMint } from './createMintForToken.ts';
import { mintToken } from './mintToken.ts';
import { transferToken } from './transferToken.ts';
import { payer, mintAuthority, recipient, mint } from './constants.ts';

async function main() {
    // const createdMint = await createMintForToken(payer, mintAuthority);
    // const transferToATA = await transferToken(payer, mint, recipient, 50);
    const tx = await mintToken(payer, mint, recipient, 100);
    console.log('mint tx:', tx);
}

main().catch(console.error);
