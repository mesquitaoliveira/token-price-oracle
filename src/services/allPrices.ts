import { ethers } from "ethers";
import { tokens } from "../config/tokens";
import { chainlinkOracleAbi } from "../utils/chainlink-oracle";
import { RPC_URL } from "../config/constants";

const provider = new ethers.JsonRpcProvider(RPC_URL);

let priceCache: Record<string, { price: string; timestamp: number }> = {}; // Cache local
const CACHE_DURATION = 60 * 1000; // 60s

export async function fetchAllPrices(): Promise<
  Record<
    string,
    { ticker: string; name: string; decimals: number; usdPrice: string }
  >
> {
  const now = Date.now();

  // Retorna do cache se ainda estiver válido
  if (
    Object.keys(priceCache).length > 0 &&
    now - Object.values(priceCache)[0].timestamp < CACHE_DURATION
  ) {
    return Object.fromEntries(
      Object.entries(tokens).map(([ticker, token]) => [
        ticker,
        {
          ticker: token.ticker,
          name: token.name,
          decimals: token.decimals,
          usdPrice: priceCache[ticker]?.price || "0"
        }
      ])
    );
  }

  // Faz as chamadas para obter os preços
  const pricePromises = Object.entries(tokens).map(async ([ticker, token]) => {
    try {
      const contract = new ethers.Contract(
        token.contractAddress,
        chainlinkOracleAbi,
        provider
      );
      const priceData = await contract.latestAnswer();
      const usdPrice = (Number(priceData) / 1e8).toFixed(9);
      priceCache[ticker] = { price: usdPrice, timestamp: now };

      return [
        ticker,
        {
          ticker: token.ticker,
          name: token.name,
          decimals: token.decimals,
          usdPrice
        }
      ];
    } catch (error) {
      console.error(`Erro ao buscar preço para ${ticker}:`, error);
      return [
        ticker,
        {
          ticker: token.ticker,
          name: token.name,
          decimals: token.decimals,
          usdPrice: "0"
        }
      ];
    }
  });

  const prices = await Promise.all(pricePromises);
  return Object.fromEntries(prices);
}
