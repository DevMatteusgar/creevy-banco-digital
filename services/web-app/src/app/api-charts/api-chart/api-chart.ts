import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ChartComponent,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { ChartDataResponse } from '../../interfaces/ChartDataResponse';
import { ApiChartService } from '../../services/api-chart-service/api-chart-service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-api-chart',
  templateUrl: './api-chart.html',
  styleUrls: ['./api-chart.css'],
  imports: [ChartComponent],
})
export class ApiChart implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;

  // 🔥 Agora chartOptions nunca é null — SEM TS2531
  public chartOptions: ChartOptions = {
    series: [],
    chart: { type: 'candlestick' },
    xaxis: { type: 'datetime' },
    stroke: { width: [1, 1, 1] },
    tooltip: { shared: true },
    title: { text: '', align: 'left' }
  };

  symbol = "AAPL";

  constructor(private chartService: ApiChartService) {}

  ngOnInit() {
    this.loadInitialData();
  }

  // -------------------------
  // CARREGA HISTÓRICO INICIAL
  // -------------------------
  loadInitialData() {
    this.chartService.getInfo(this.symbol).subscribe((data: ChartDataResponse) => {

      const candles = data.candles;

      const ohlc = candles.map(c => ({
        x: new Date(c.time),
        y: [c.open, c.high, c.low, c.close]
      }));

      const sma20 = data.indicators['SMA_20']
        .map((v, i) => v != null ? { x: new Date(candles[i].time), y: v } : null)
        .filter(v => v !== null) as any[];

      const ema20 = data.indicators['EMA_20']
        .map((v, i) => v != null ? { x: new Date(candles[i].time), y: v } : null)
        .filter(v => v !== null) as any[];

      // 🔥 SEM undefined — evita TS2322
      this.chartOptions = {
        chart: {
          type: 'candlestick',
          height: 500,
          toolbar: { show: true }
        },
        title: {
          text: `${this.symbol} - Candles + Indicadores`,
          align: 'left'
        },
        series: [
          { name: 'Candles', type: "candlestick", data: ohlc },
          { name: 'SMA 20', type: 'line', data: sma20 },
          { name: 'EMA 20', type: 'line', data: ema20 }
        ],
        xaxis: { type: 'datetime' },
        stroke: { width: [1, 2, 2] },
        tooltip: { shared: true }
      };

      setTimeout(() => this.setupRealtime(), 200);
    });
  }

  // ---------------------------------
  // ATUALIZAÇÃO DE CANDLE EM REAL-TIME
  // ---------------------------------
  setupRealtime() {
    // 🔥 Agora chartOptions.series sempre existe
    this.chartService.connectRealtime((msg) => {
      if (!msg?.close) return;

      const newCandle = {
        x: new Date(msg.time),
        y: [msg.open, msg.high, msg.low, msg.close]
      };

      const candleSeries = this.chartOptions.series[0].data as any[];
      candleSeries.push(newCandle);

      this.chart.updateSeries(this.chartOptions.series);
    });
  }
}
