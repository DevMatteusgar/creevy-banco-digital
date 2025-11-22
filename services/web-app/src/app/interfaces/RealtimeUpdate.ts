import {CandleDto} from './CandleDto';

export interface RealtimeUpdate {
  symbol: string;
  candle: CandleDto;
  indicators: { [key: string]: number[] };
}
