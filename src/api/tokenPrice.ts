import express, { Request, Response, NextFunction } from "express";
import { getTokenPrice } from "../services/priceService";
import { fetchAllPrices } from "../services/allPrices";

const router = express.Router();

/**
 * Endpoint para obter um único preço ou todos os preços de uma vez.
 * Se `ticker` for passado, busca um token específico.
 * Se `all=true` for passado, retorna todos os preços disponíveis.
 */
router.get(
  "/token-price",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ticker, all } = req.query;

      if (all === "true") {
        // Retorna todos os preços se `all=true`
        const prices = await fetchAllPrices();
        res.json(prices);
        return;
      }

      if (!ticker) {
        res.status(400).json({ error: "O parâmetro 'ticker' é obrigatório." });
        return;
      }

      const priceData = await getTokenPrice(ticker as string);

      if (!priceData) {
        res
          .status(404)
          .json({ error: "Token não encontrado ou erro ao buscar preço." });
        return;
      }

      res.json(priceData);
    } catch (error) {
      next(error); // Passa o erro para o middleware de erro do Express
    }
  }
);

export default router;
