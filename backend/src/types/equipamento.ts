export interface Equipamento {
  id: string;
  nome: string;
  tipo: string;
  numero_serie: string;
  status: string;
  data_aquisicao: string;
  criado_em: Date;
}

export interface CriarEquipamento {
  nome: string;
  tipo: string;
  numero_serie: string;
  status?: string;
  data_aquisicao: string;
}
