import { pool } from "../database/connection.js";
import { Equipamento, CriarEquipamento } from "../types/equipamento.js";

class EquipamentoService {
  async getAll(): Promise<Equipamento[]> {
    const res = await pool.query<Equipamento>("SELECT * FROM equipamento");

    return res.rows;
  }

  async create(dados: CriarEquipamento): Promise<Equipamento> {
    const res = await pool.query<Equipamento>(
      `INSERT INTO equipamento 
            (nome, tipo, numero_serie, status, data_aquisicao) 
            VALUES ($1, $2, $3, COALESCE($4, 'disponivel'), $5) RETURNING *`,
      [
        dados.nome,
        dados.tipo,
        dados.numero_serie,
        dados.status,
        dados.data_aquisicao,
      ],
    );

    const equipamento = res.rows[0];

    //Mesma verificação de !cliente
    if (!equipamento) {
      throw new Error("O banco não retornou o equipamento cadastrado");
    }

    return equipamento;
  }
}

export const equipmentService = new EquipamentoService();
