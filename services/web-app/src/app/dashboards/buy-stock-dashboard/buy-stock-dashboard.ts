import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockMarketInfo } from '../../interfaces/StockMarketInfo';
import { StockMarketService } from '../../services/stocks-service/stock-market-service';

@Component({
  selector: 'app-buy-stock-dashboard',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './buy-stock-dashboard.html',
  styleUrl: './buy-stock-dashboard.css',
})
export class BuyStockDashboard implements OnInit{

  stocks: StockMarketInfo[] = [];
  selectedStock: StockMarketInfo | null = null;
  loading = true;
  error: string | null = null;
  purchaseQuantity: number = 1;
  purchasing = false;
  successMessage: string | null = null;

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
        // Seleciona a primeira ação automaticamente
        if (data.length > 0) {
          this.selectStock(data[0]);
        }
      },
      error: (err) => {
        if (err.status === 0) {
          this.error = 'Não foi possível conectar ao servidor.';
        } else if (err.status === 401) {
          this.error = 'Não autorizado. Faça login novamente.';
        } else {
          this.error = 'Erro ao carregar cotações. Tente novamente.';
        }
        this.loading = false;
      }
    });
  }

  selectStock(stock: StockMarketInfo): void {
    this.selectedStock = stock;
    this.purchaseQuantity = 1;
  }

  getLogoUrl(stock: StockMarketInfo): string {
    if (!stock.logoUrl || stock.logoUrl.trim() === '') {
      const letter = stock.stockIdentifier.charAt(0);
      return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%234CAF50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="white" font-weight="bold"%3E${letter}%3C/text%3E%3C/svg%3E`;
    }
    return stock.logoUrl;
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

  getTotalPurchase(): number {
    if (this.selectedStock) {
      return this.selectedStock.price * this.purchaseQuantity;
    }
    return 0;
  }

  buyStock(): void {
    if (this.selectedStock && this.purchaseQuantity > 0) {
      this.purchasing = true;
      this.error = null;
      this.successMessage = null;

      this.stockService.buyStock(
        this.selectedStock.stockIdentifier,
        this.purchaseQuantity
      ).subscribe({
        next: (response) => {
          this.purchasing = false;
          this.successMessage = `Compra realizada com sucesso! ${this.purchaseQuantity}x ${this.selectedStock!.stockIdentifier} - Total: ${this.formatPrice(response.totalValue, this.selectedStock!.currency)}`;

          // Reseta a quantidade após a compra
          this.purchaseQuantity = 1;

          // Remove a mensagem de sucesso após 5 segundos
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (err) => {
          this.purchasing = false;

          // Tenta pegar a mensagem do backend
          let errorMessage = 'Erro ao realizar compra. Tente novamente.';

          if (err.error) {
            // Se o erro vier como string direta
            if (typeof err.error === 'string') {
              errorMessage = err.error;
            }
            // Se o erro vier em um objeto com propriedade 'message'
            else if (err.error.message) {
              errorMessage = err.error.message;
            }
            // Se o erro vier em um objeto com propriedade 'error'
            else if (err.error.error) {
              errorMessage = err.error.error;
            }
            // Se o erro vier em um objeto com propriedade 'mensagem'
            else if (err.error.mensagem) {
              errorMessage = err.error.mensagem;
            }
          }

          // Fallback para mensagens genéricas baseadas no status
          if (errorMessage === 'Erro ao realizar compra. Tente novamente.') {
            if (err.status === 0) {
              errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
            } else if (err.status === 401) {
              errorMessage = 'Sessão expirada. Faça login novamente.';
            } else if (err.status === 403) {
              errorMessage = 'Você não tem permissão para realizar esta operação.';
            } else if (err.status === 404) {
              errorMessage = 'Ação não encontrada no sistema.';
            } else if (err.status === 500) {
              errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
            }
          }

          this.error = errorMessage;

          // Remove a mensagem de erro após 7 segundos
          setTimeout(() => {
            this.error = null;
          }, 7000);

          console.error('Erro detalhado na compra:', err);
        }
      });
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%234CAF50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="32" fill="white" font-weight="bold"%3E$%3C/text%3E%3C/svg%3E';
    }
  }
}
