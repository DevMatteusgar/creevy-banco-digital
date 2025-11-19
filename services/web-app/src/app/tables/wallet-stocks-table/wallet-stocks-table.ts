// wallet-stocks-table.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StocksSummary } from '../../interfaces/StocksSummary';
import { StockMarketService } from '../../services/stocks-service/stock-market-service';

@Component({
  selector: 'app-wallet-stocks-table',
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './wallet-stocks-table.html',
  styleUrl: './wallet-stocks-table.css',
})
export class WalletStocksTable implements OnInit {

  myStocks: StocksSummary[] = [];
  loading: boolean = true;
  error: string = '';

  selectedStockIndex: number | null = null;

  sellForm = {
    stockIdentifier: '',
    stockQuantity: 0
  };

  //mensagem de erro específica da venda
  sellErrorMessage: string = '';
  sellLoading: boolean = false;

  constructor(private stockMarketService: StockMarketService) {}

  ngOnInit(): void {
    this.loadMyStocks();
  }

  loadMyStocks(): void {
    this.loading = true;
    this.error = '';

    this.stockMarketService.getMyStocks().subscribe({
      next: (data) => {
        this.myStocks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar suas ações. Tente novamente.';
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }

  toggleSellForm(index: number, stock: StocksSummary): void {
    if (this.selectedStockIndex === index) {
      this.selectedStockIndex = null;
      this.sellErrorMessage = '';
    } else {
      this.selectedStockIndex = index;
      this.sellForm.stockIdentifier = stock.stockIdentifier;
      this.sellForm.stockQuantity = 0;
      this.sellErrorMessage = '';
    }
  }

  submitSell(): void {
    this.sellErrorMessage = '';

    // Validações locais
    if (this.sellForm.stockQuantity <= 0) {
      this.sellErrorMessage = "A quantidade deve ser maior que zero";
      return;
    }

    const selectedStock = this.myStocks[this.selectedStockIndex!];
    if (this.sellForm.stockQuantity > selectedStock.stockQuantity) {
      this.sellErrorMessage = `Você possui apenas ${selectedStock.stockQuantity} ações disponíveis`;
      return;
    }

    this.sellLoading = true;

    this.stockMarketService.sellStock(
      this.sellForm.stockIdentifier,
      this.sellForm.stockQuantity
    ).subscribe({
      next: () => {
        alert("Venda realizada com sucesso!");
        this.selectedStockIndex = null;
        this.sellForm.stockQuantity = 0;
        this.sellErrorMessage = '';
        this.sellLoading = false;
        this.loadMyStocks();
      },
      error: (err) => {
        console.error(err);

        // Captura mensagem de erro do backend
        if (err.error && err.error.message) {
          this.sellErrorMessage = err.error.message;
        } else if (err.error && typeof err.error === 'string') {
          this.sellErrorMessage = err.error;
        } else if (err.message) {
          this.sellErrorMessage = err.message;
        } else {
          this.sellErrorMessage = "Erro ao processar a venda. Tente novamente.";
        }

        this.sellLoading = false;
      }
    });
  }

  calculateTotalValue(): number {
    return this.myStocks.reduce((total, stock) => {
      return total + stock.stockTotalValue;
    }, 0);
  }

  calculateEstimatedValue(): number {
    if (this.selectedStockIndex === null) return 0;
    const stock = this.myStocks[this.selectedStockIndex];
    return this.sellForm.stockQuantity * stock.stockPrice;
  }
}
