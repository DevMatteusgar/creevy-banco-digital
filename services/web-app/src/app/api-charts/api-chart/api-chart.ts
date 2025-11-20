import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiChartService } from '../../services/api-chart-service/api-chart-service';
import { ChartDataResponse } from '../../interfaces/ChartDataResponse';
import {CommonModule} from '@angular/common';
import {ChartComponent} from 'ng-apexcharts';

@Component({
  selector: 'app-api-chart',
  templateUrl: './api-chart.html',
  imports: [CommonModule, ChartComponent],
  styleUrls: ['./api-chart.css']
})
export class ApiChart implements OnInit, OnDestroy {

  chartOptions: any;
  chartData: ChartDataResponse | null = null;

  constructor(private chartService: ApiChartService) {}

  ngOnInit(): void {
    const symbols = ['AAPL', 'MSFT']; // símbolos que você quer receber no WebSocket

    this.chartService.connectRealtime(symbols, (symbol: string, msg: any) => {
      console.log('Mensagem recebida para', symbol, msg);
      // Aqui você pode atualizar chartData ou chartOptions dinamicamente
      if (symbol === 'AAPL') {
        this.chartData = msg;
        this.updateChartOptions();
      }
    });
  }

  ngOnDestroy(): void {
    this.chartService.disconnect();
  }

  private updateChartOptions(): void {
    if (!this.chartData) return;

    this.chartOptions = {
      series: [
        {
          name: this.chartData.symbol,
          data: this.chartData.candles.map(c => ({
            x: c.time,
            y: [c.open, c.high, c.low, c.close]
          }))
        }
      ],
      chart: { type: 'candlestick' },
      title: { text: this.chartData.symbol }
    };
  }
}
