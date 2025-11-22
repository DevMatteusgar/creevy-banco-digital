import {CandleDto} from './CandleDto';

export interface ChartDataResponse {
  symbol: string;
  price: number;
  // ... outras propriedades de info ...
  candles: CandleDto[];
  indicators: { [key: string]: number[] };
}
