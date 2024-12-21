import { ethers, parseUnits } from "ethers";
import { tokens } from "../config/tokens"; // Corrigido para usar 'tokens'
import { chainlinkOracleAbi } from "../utils/chainlink-oracle";
import {  RPC_URL } from "../config/constants";

const provider = new ethers.JsonRpcProvider(RPC_URL);

export async function getTokenPrice(ticker: string): Promise<{
  ticker: string;
  name: string;
  decimals: number;
  usdPrice: string;
} | null> {
  const token = tokens[ticker.toLowerCase()]; // Corrigido para usar 'token'
  if (!token) {
    console.error(`Token não encontrado para o ticker: ${ticker}`);
    return null;
  }

  try {
    const contract = new ethers.Contract(
      token.contractAddress,
      chainlinkOracleAbi,
      provider
    );

    const priceData = await contract.latestAnswer();
    const usdPrice = (Number(priceData) / 100000000).toFixed(9);;

    return {
      ticker: token.ticker,
      name: token.name,
      decimals: token.decimals,
      usdPrice
    };
  } catch (error) {
    console.error("Erro ao obter o preço do token:", error);
    return null;
  }
}
