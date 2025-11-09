export interface TransferDtoResponse {
  userId: number;
  operationType: string; // "TransferSend" ou "TransferReceive"
  value: number;
  balanceAfterOperation: number;
  message: string;
}
