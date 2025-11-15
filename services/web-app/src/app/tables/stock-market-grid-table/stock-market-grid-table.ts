import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockMarketInfo } from '../../interfaces/StockMarketInfo';
import { StockMarketService } from '../../services/stocks-service/stock-market-service';

@Component({
  selector: 'app-stock-market-grid-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-market-grid-table.html',
  styleUrl: './stock-market-grid-table.css',
})
export class StockMarketGridTable implements OnInit {
  stocks: StockMarketInfo[] = [];
  loading = true;
  error: string | null = null;

  constructor(private stockService: StockMarketService) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.loading = true;
    this.error = null;

    this.stockService.getAllFixedStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 0) {
          this.error = 'Não foi possível conectar ao servidor.';
        } else if (err.status === 401) {
          this.error = 'Não autorizado. Faça login novamente.';
        } else if (err.status === 403) {
          this.error = 'Acesso negado.';
        } else if (err.status === 404) {
          this.error = 'Endpoint não encontrado.';
        } else {
          this.error = 'Erro ao carregar cotações. Tente novamente.';
        }
        this.loading = false;
      }
    });
  }

  formatPrice(price: number, currency: string): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'BRL' ? 'BRL' : 'USD'
    }).format(price);
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1_000_000_000) {
      return `${(marketCap / 1_000_000_000).toFixed(2)}B`;
    } else if (marketCap >= 1_000_000) {
      return `${(marketCap / 1_000_000).toFixed(2)}M`;
    }
    return marketCap.toFixed(2);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/default-stock-logo.png';
    }
  }

  refresh(): void {
    this.loadStocks();
  }
}
