import { createTokenMint } from "./createMintForToken.ts";
import { mintToken } from "./mintToken.ts";
import { transferToken } from "./transferToken.ts";
import {
  payer,
  mintAuthority,
  recipient,
  mint,
  metaDataToken,
} from "./constants.ts";
import { createTokenWithMetadata } from "./createTokenWithMetaData.ts";
import { mintMetadataToken } from "./mintMetadataToken.ts";
import { connection } from "./connection.ts";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

async function main() {
  // const createdMint = await createMintForToken(payer, mintAuthority);
  // const transferToATA = await transferToken(payer, metaDataToken, recipient, 50);

  // const tx = await mintToken(payer, mint, recipient, 100);
  // console.log("mint tx:", tx);

  // const newTokenWithMetaData = await createTokenWithMetadata(payer)
  // console.log(`New Token: ${newTokenWithMetaData}`)

  const tx = await mintMetadataToken(payer, metaDataToken, recipient, 100);
  console.log("mint tx:", tx);
}

main().catch(console.error);
