import {
  createInitializeInstruction,
  pack,
  type TokenMetadata,
} from "@solana/spl-token-metadata";
import { connection } from "./connection.ts";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  createMint,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";

export const createTokenWithMetadata = async (payer: Keypair) => {
  const mintKeypair = Keypair.generate();
  const decimals = 6;
  const metaData: TokenMetadata = {
    updateAuthority: payer.publicKey,
    mint: mintKeypair.publicKey,
    name: "Cool Makkhi",
    symbol: "MKH",
    uri: "https://raw.githubusercontent.com/HarmishTervadiya/solana-spl-token-demo/master/asset/metadata.json",
    additionalMetadata: [],
  };

  const mintLen = getMintLen([ExtensionType.MetadataPointer]);
  const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metaData).length;
  const lamports = await connection.getMinimumBalanceForRentExemption(
    mintLen + metadataLen,
  );
  const balance = await connection.getBalance(payer.publicKey);
  console.log(balance);
  console.log(lamports);
  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      lamports: lamports,
      programId: TOKEN_2022_PROGRAM_ID,
      space: mintLen,
    }),
    createInitializeMetadataPointerInstruction(
      mintKeypair.publicKey,
      payer.publicKey,
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID,
    ),
    createInitializeMintInstruction(
      mintKeypair.publicKey,
      decimals,
      payer.publicKey,
      null,
      TOKEN_2022_PROGRAM_ID,
    ),
    createInitializeInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      mint: mintKeypair.publicKey,
      metadata: mintKeypair.publicKey,
      name: metaData.name,
      symbol: metaData.symbol,
      uri: metaData.uri,
      mintAuthority: payer.publicKey,
      updateAuthority: payer.publicKey,
    }),
  );

  const sig = await sendAndConfirmTransaction(connection, tx, [
    payer,
    mintKeypair,
  ]);
  return sig;
};
