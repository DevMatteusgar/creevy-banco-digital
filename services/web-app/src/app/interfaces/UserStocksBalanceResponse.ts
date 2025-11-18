import { UserStockDetail } from './UserStockDetail';

export interface UserStocksBalanceResponse {
  totalInvested: number;
  totalCurrent: number;
  totalProfitValue: number;
  totalProfitPercent: number;
  stocks: UserStockDetail[];
}

