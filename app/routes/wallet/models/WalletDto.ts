import type { TypeBalanceEnum } from "../enums/TypeBalanceEnum";

export interface WalletBalanceDto {
  id: number;
  tipo: TypeBalanceEnum;
  saldo: number;
}

export interface WalletDto {
  id: number;
  balance: WalletBalanceDto[];
}
