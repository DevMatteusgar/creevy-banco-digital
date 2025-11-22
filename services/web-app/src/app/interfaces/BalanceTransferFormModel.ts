export interface BalanceTransferFormModel {
  transferType: 'savingsToInvestments' | 'investmentsToSavings';
  amount: number | null;
}
