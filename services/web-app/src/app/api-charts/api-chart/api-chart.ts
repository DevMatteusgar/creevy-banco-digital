import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiChartService } from '../../services/api-chart-service/api-chart-service';
import { ChartDataResponse } from '../../interfaces/ChartDataResponse';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";
import { CandleDto } from '../../interfaces/CandleDto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-api-chart',
  templateUrl: './api-chart.html',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FormsModule],
  styleUrls: ['./api-chart.css']
})
export class ApiChart implements OnInit, OnDestroy {

  chartOptions: any;
  chartData: ChartDataResponse | null = null;

  availableSymbols: string[] = ['AAPL', 'MSFT', 'GOOG']; // ações disponíveis
  selectedSymbol: string = 'AAPL'; // símbolo inicial

  constructor(private chartService: ApiChartService) {}

  ngOnInit(): void {
    this.connectSymbol(this.selectedSymbol);
  }

  ngOnDestroy(): void {
    this.chartService.disconnect();
  }

  selectSymbol(symbol: string) {
    this.selectedSymbol = symbol;
    this.connectSymbol(symbol);
  }

  private connectSymbol(symbol: string) {
    this.chartService.disconnect();

    this.chartService.connectRealtime([symbol], (sym: string, msg: any) => {
      console.log('[WS] Mensagem recebida para', sym, msg);

      const candles: CandleDto[] = msg.candles.map((c: any) => ({
        ...c,
        time: new Date(c.time) // garante Date
      }));

      const lastClose = candles.length > 0 ? candles[candles.length - 1].close : 0;

      this.chartData = {
        symbol: msg.symbol,
        candles: candles,
        indicators: msg.indicators || {},
        price: lastClose
      };

      console.log('[WS] ChartData atualizado:', this.chartData);

      this.updateChartOptions();
    });
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
      chart: {
        type: 'candlestick',
        height: 400,
        toolbar: { show: true },
        zoom: { enabled: true },
      },
      title: {
        text: this.chartData.symbol,
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: { enabled: true }
      }
    };

    console.log('[Chart] ChartOptions atualizadas');
  }
}
