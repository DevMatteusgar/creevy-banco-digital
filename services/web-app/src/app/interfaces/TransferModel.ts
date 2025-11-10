export interface TransferModel {
  id: number;
  senderId: number;
  receiverId: number;
  senderCpf: string;
  receiverCpf: string;
  senderName: string;
  receiverName: string;
  operationType: string;
  amount: number;
  balanceAfterOperation: number;
  description: string;
  date: string; // LocalDateTime → string no JSON
}
