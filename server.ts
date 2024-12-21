import express from "express";
import tokenPriceRouter from "./src/api/tokenPrice";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["https://flux-fi.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true
};

// Middleware de CORS
app.use(cors(corsOptions));

// Middleware explícito para OPTIONS
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://flux-fi.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // Responde corretamente à requisição preflight
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", tokenPriceRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

