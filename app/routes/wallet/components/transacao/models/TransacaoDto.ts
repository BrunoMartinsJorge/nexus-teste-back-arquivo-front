export interface TransacaoDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Transacao[];
}

export interface Transacao {
  id: number;
  tipo: "DEPOSITO" | "SWAP" | "WITHDRAWAL";
  tokenFrom: string;
  tokenTo: string;
  valorFrom: number;
  valorTo: number;
  taxa: number;
  dataHora: string;
}
