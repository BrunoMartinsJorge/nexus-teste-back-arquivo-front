export interface MovimentacaoDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Movimentacao[];
}

export interface Movimentacao {
  id: number;
  tipo: string;
  token: string;
  valor: number;
  saldoAnterior: number;
  saldoNovo: number;
  dataHora: string;
}