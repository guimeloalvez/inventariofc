import express, { type Request, type Response } from "express";
import { equipamentoRouter } from "./routes/equipment.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  return response.json({
    status: "ok",
  });
});

app.use("/equipamentos", equipamentoRouter);

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
