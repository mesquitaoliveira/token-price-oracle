import express from "express";
import { fetchAllPrices } from "../services/allPrices";

const router = express.Router();

router.get("/token-prices", async (req, res) => {
  try {
    const prices = await fetchAllPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter os preços." });
  }
});

export default router;
