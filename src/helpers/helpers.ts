import { ExternalProvider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export async function getEthereumSigner() {
  try {
    const detectedProvider =
      (await detectEthereumProvider()) as ExternalProvider;

    /* Check if the Ethereum provider exists */
    if (!detectedProvider) {
      throw new Error("Please install MetaMask!");
    }

    const web3Provider = new ethers.providers.Web3Provider(detectedProvider);

    await web3Provider.send("eth_requestAccounts", []);

    const signer = web3Provider.getSigner();
    return signer;
  } catch (error) {
    throw error;
  }
}

export async function getProvider() {
  try {
    const detectedProvider =
      (await detectEthereumProvider()) as ExternalProvider;

    /* Check if the Ethereum provider exists */
    if (!detectedProvider) {
      throw new Error("Please install MetaMask!");
    }

    const web3Provider = new ethers.providers.Web3Provider(detectedProvider);
    return web3Provider;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function parseIPFSUrl(url: string): string | undefined {
  if (url.length === 0) return;
  if (
    url.includes("https://gateway.ipfscdn.io/ipfs/") ||
    url.includes("https://ipfs.io/ipfs/")
  )
    return url;

  const newURL = url.replace("ipfs://", "");

  return "https://gateway.ipfscdn.io/ipfs/" + newURL;
}
