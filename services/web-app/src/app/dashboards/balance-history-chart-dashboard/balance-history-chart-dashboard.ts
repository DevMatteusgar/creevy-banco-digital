import { Component, OnInit } from '@angular/core';
import {ChartData, ChartType, Chart, registerables, ChartConfiguration} from 'chart.js';
import {BalanceService} from '../../services/balance-service/balance-service';
import {BaseChartDirective} from 'ng2-charts';

//Registro do charts
Chart.register(...registerables);

@Component({
  selector: 'app-balance-history-chart-dashboard',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './balance-history-chart-dashboard.html',
  styleUrl: './balance-history-chart-dashboard.css',
})
export class BalanceHistoryChartDashboard implements OnInit {

  chartData: ChartData<'line'> = { labels: [], datasets: [] };
  chartType: ChartType = 'line';

  //Configurações do canvas do gráfico
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    plugins: {
      legend: {
        position: 'top', // valor literal reconhecido
        labels: {
          boxWidth: 15,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Evolução Patrimonial',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 30 }
      },
    },
    layout: {
      padding: 10,
    },
  };

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {

    this.balanceService.getBalanceHistory().subscribe(history => {
      const sorted = history.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      this.chartData = {
        labels: sorted.map(h => new Date(h.date).toLocaleDateString()),
        datasets: [
          {
            label: 'Evolução Patrimonial',
            data: sorted.map(h => h.balance),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.3)',
            fill: true,
            tension: 0.3
          }
        ]
      };
    });
  }
}
