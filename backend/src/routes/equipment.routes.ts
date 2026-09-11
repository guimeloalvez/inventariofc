import { Router, type Request, type Response } from "express";
import { equipmentService } from "../services/equipment.services.js";
import { CriarEquipamento } from "../types/equipamento.js";

export const equipamentoRouter = Router();

equipamentoRouter.get("/", async (_request: Request, response: Response) => {
  try {
    const res = await equipmentService.getAll();

    return response.json(res);
  } catch (error) {
    console.log(error);

    return response.status(500).json({
      error: "Erro Interno",
    });
  }
});

equipamentoRouter.post(
  "/",
  async (request: Request<{}, {}, CriarEquipamento>, response: Response) => {
    try {
      const dados = request.body;

      const equipamento = await equipmentService.create(dados);

      return response.status(201).json(equipamento);
    } catch (error: any) {
      console.error(error);

      // Desafio Opcional: Se for erro de duplicidade no Postgres (código 23505)
      if (error.code === "23505") {
        return response.status(409).json({
          error: "Conflito: Número de série já cadastrado",
        });
      }

      return response.status(500).json({
        error: "Erro Interno",
      });
    }
  },
);
