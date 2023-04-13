import { ExternalProvider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
// import pinataSDK from "@pinata/sdk";
// const pinata = new pinataSDK({
//   pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_ACCESS_TOKEN,
// });

type UserData = {
  handle: string;
  profileId: number;
};

type TokenData = {
  accessToken: string;
  generatedAt: Date;
};

export const getAccessToken = (): string => {
  if (typeof window != "undefined") {
    const ls = window.localStorage;

    if (ls) {
      const tokenJSON = ls.getItem("LH_STORAGE_KEY");
      if (!tokenJSON) {
        return "";
      }

      const tokenData = JSON.parse(tokenJSON) as TokenData;
      const { generatedAt, accessToken } = tokenData;

      if (isDateMoreThanDayOld(generatedAt)) {
        return "";
      }

      if (accessToken) {
        return accessToken;
      }
    }
  }
  return "";
};

export const setAccessToken = (accessToken: string) => {
  if (typeof window != "undefined") {
    const ls = window.localStorage;
    if (ls) {
      ls.setItem(
        "LH_STORAGE_KEY",
        JSON.stringify({ accessToken, generatedAt: new Date() })
      );
    }
  }
};

export const removeAccessToken = () => {
  if (typeof window != "undefined") {
    const ls = window.localStorage;

    if (ls) {
      ls.removeItem("LH_STORAGE_KEY");
    }
  }
};

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

export function isDateMoreThanDayOld(date: Date): boolean {
  // Get the current time in milliseconds
  const now = new Date().getTime();

  // Calculate the difference between the current time and the given date in milliseconds
  const diffInMilliseconds = now - new Date(date).getTime();

  // Calculate the difference in hours
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  // Return true if the difference in hours is greater than 4, false otherwise
  return diffInDays > 1;
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
