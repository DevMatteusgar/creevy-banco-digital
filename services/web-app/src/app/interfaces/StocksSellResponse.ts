export interface StocksSellResponse {
  id: number;
  stockIdentifier: string;
  stockQuantity: number;
  totalValue: number;
  transferDate: string;
  transferType: string;
}
