import { DECIMALS, DATA_FEEDS } from "./constants";

interface Token {
  name: string;
  contractAddress: string;
  ticker: string;
  decimals: number;
}

export const tokens: Record<string, Token> = {
  brl: {
    name: "BRL Token Test",
    contractAddress: DATA_FEEDS.BRL,
    ticker: "BRL",
    decimals: DECIMALS.BRL
  },
  usdc: {
    name: "USD Coin",
    contractAddress: DATA_FEEDS.USDC,
    ticker: "USDC",
    decimals: DECIMALS.USDC
  },
  wxrp: {
    name: "Ripple",
    contractAddress: DATA_FEEDS.XRP,
    ticker: "WXRP",
    decimals: DECIMALS.XRP
  },
  wbtc: {
    name: "Bitcoin",
    contractAddress: DATA_FEEDS.BTC,
    ticker: "WBTC",
    decimals: 8
  },
  weth: {
    name: "Ethereum",
    contractAddress: DATA_FEEDS.ETH,
    ticker: "WETH",
    decimals: DECIMALS.ETH
  }
};
