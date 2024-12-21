import express, { Request, Response, NextFunction } from "express";
import { getTokenPrice } from "../services/priceService";

const router = express.Router();

router.get(
  "/token-price",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ticker } = req.query;

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
