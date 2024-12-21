import { config } from "dotenv";
config();

export const RPC_URL = "https://bsc-dataseed.binance.org";
export const DECIMALS = {
  USDC: 6,
  BRL: 6,
  XRP: 18,
  BTC: 8,
  ETH: 18
};

export const DATA_FEEDS = {
  BRL: "0x5cb1Cb3eA5FB46de1CE1D0F3BaDB3212e8d8eF48",
  USDC: "0x51597f405303C4377E36123cBc172b13269EA163",
  XRP: "0x93A67D414896A280bF8FFB3b389fE3686E014fda",
  BTC: "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
  ETH: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e"
};
