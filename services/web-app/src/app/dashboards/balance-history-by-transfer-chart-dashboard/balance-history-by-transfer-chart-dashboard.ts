import { Component, OnInit } from '@angular/core';
import {ChartData, ChartType, Chart, registerables, ChartConfiguration} from 'chart.js';
import { BalanceService } from '../../services/balance-service/balance-service';
import { BaseChartDirective } from 'ng2-charts';

// ✅ Registro necessário do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-balance-history-by-transfer-chart-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './balance-history-by-transfer-chart-dashboard.html',
  styleUrl: './balance-history-by-transfer-chart-dashboard.css',
})
export class BalanceHistoryByTransferChartDashboard implements OnInit {

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
    },
    layout: {
      padding: 10,
    },
  };

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.getBalanceHistoryByTransfer().subscribe(history => {
      // Ordena por data (caso backend não garanta)
      const sorted = history.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      this.chartData = {
        labels: sorted.map((_, index) => `Tx #${index + 1}`),
        datasets: [
          {
            label: 'Evolução Patrimonial por Transação',
            data: sorted.map(h => h.balance),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.3)',
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.2
          }
        ]
      };
    });
  }
}
