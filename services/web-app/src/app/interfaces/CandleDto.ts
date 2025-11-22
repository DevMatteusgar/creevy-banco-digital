export interface CandleDto {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  time: string; // será convertido pelo chart
}
