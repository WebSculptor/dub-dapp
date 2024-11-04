import { ethers } from "ethers";
import CONTRACT_ABI from "@/jsons/contract.json";
import { env } from "../env";

export let ethereum: any;
if (typeof window !== "undefined") ethereum = (window as any).ethereum;

export const getRequiredSigner = async () => {
  if (!ethereum) {
    throw new Error("MetaMask is not installed");
  }

  if (typeof ethereum.request !== "function") {
    throw new Error("MetaMask does not support ethereum.request method");
  }

  try {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    let provider;
    let signer;

    if (accounts?.length > 0) {
      provider = new ethers.BrowserProvider(ethereum);
      signer = await provider.getSigner();
      return signer;
    } else {
      provider = new ethers.JsonRpcProvider(env.rpcUrl);
      const wallet = ethers.Wallet.createRandom();
      signer = wallet.connect(provider);
      return signer;
    }
  } catch (error) {
    console.error("Error getting SIGNER:", error);
    throw new Error("Failed to get SIGNER");
  }
};

export const getContract = async () => {
  if (!ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const signer = await getRequiredSigner();

    const contracts = new ethers.Contract(
      env.contractAddress,
      CONTRACT_ABI,
      signer
    );
    return contracts;
  } catch (error) {
    console.error("Error getting Ethereum contracts:", error);
    throw new Error("Failed to get Ethereum contracts");
  }
};
