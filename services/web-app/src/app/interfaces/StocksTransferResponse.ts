export interface StocksTransferResponse {
  transferId: number;
  creationDate: string; // ISO string
  stockName: string;
  stockIdentifier: string;
  stockQuantity: number;
  stockPrice: number;
  transactionTotalPrice: number;
  balanceAfterOperation: number;
  operationType: 'BUY' | 'SELL' | 'ADD' | 'REMOVE' | string;
}
