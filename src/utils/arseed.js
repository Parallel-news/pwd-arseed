import { genNodeAPI } from "arseeding-js";
import dotenv from "dotenv";
dotenv.config();

export async function archive(input) {
  try {
    const instance = await genNodeAPI(process.env.PRIVATE_KEY);

    const arseedUrl = "https://arseed.web3infra.dev";
    const data = Buffer.from(input);
    const payCurrency = "eth";
    const ops = {
      tags: [{ name: "Content-Type", value: "application/json" }],
    };
    const tx = await instance.sendAndPay(arseedUrl, data, payCurrency, ops);
    return tx?.order?.itemId;
  } catch (error) {
    console.log(error);
    return false;
  }
}