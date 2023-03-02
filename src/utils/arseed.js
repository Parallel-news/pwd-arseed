import { genNodeAPI } from "arseeding-js";
import dotenv from "dotenv";
dotenv.config();

export async function archive(input) {
  try {
    const instance = await genNodeAPI(process.env.PRIVATE_KEY);
    const type = atob(input.mime)
    const arseedUrl = "https://arseed.web3infra.dev";
    const data = Buffer.from(atob(input.content));
    const payCurrency = "eth";
    const ops = {
      tags: [{ name: "Content-Type", value: type }],
    };
    const tx = await instance.sendAndPay(arseedUrl, data, payCurrency, ops);
    return tx?.order?.itemId;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function archiveMedia(input) {
  try {
    const instance = await genNodeAPI(process.env.PRIVATE_KEY);

    const arseedUrl = "https://arseed.web3infra.dev";
    const base64String = (JSON.parse(input))?.content;
    const binaryString = atob(
      base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, "")
    );

    // Create an ArrayBuffer from the binary data
    const arrayBuffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      arrayBuffer[i] = binaryString.charCodeAt(i);
    }
    const payCurrency = "eth";
    const ops = {
      tags: [{ name: "Content-Type", value: atob((JSON.parse(input))?.mime) }],
    };
    const tx = await instance.sendAndPay(
      arseedUrl,
      arrayBuffer,
      payCurrency,
      ops
    );
    return tx?.order?.itemId;
  } catch (error) {
    console.log(error);
    return false;
  }
}
