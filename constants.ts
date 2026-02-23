import { Keypair, PublicKey } from '@solana/web3.js';

export const payer = Keypair.fromSecretKey(Uint8Array.from([168,25,31,223,217,164,188,212,136,174,44,1,81,125,200,137,3,105,13,178,37,64,233,201,131,130,220,32,171,125,104,195,73,65,46,72,72,129,192,198,254,126,163,187,165,5,54,181,41,42,139,14,236,24,130,174,108,39,51,67,145,112,249,15]));
export const mintAuthority = payer;

export const recipient = new PublicKey('CL9gAAiFQJ5WZZDWN82wGegVCi2WzQHpeHLebt5gGNss');
export const mint = new PublicKey('DKbCyo85JMqJkysQzB5Ck4w7mr8nsfFG3tdHEcjTtFMX');
