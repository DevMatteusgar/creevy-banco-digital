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
    } else {
      this.selectedStockIndex = index;
      this.sellForm.stockIdentifier = stock.stockIdentifier;
      this.sellForm.stockQuantity = 0;
    }
  }

  submitSell(): void {
    if (this.sellForm.stockQuantity <= 0) {
      alert("Quantidade inválida.");
      return;
    }

    this.stockMarketService.sellStock(
      this.sellForm.stockIdentifier,
      this.sellForm.stockQuantity
    ).subscribe({
      next: () => {
        alert("Venda realizada com sucesso!");
        this.selectedStockIndex = null;
        this.loadMyStocks();
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao vender a ação.");
      }
    });
  }

  calculateTotalValue(): number {
    return this.myStocks.reduce((total, stock) => {
      return total + stock.stockTotalValue;
    }, 0);
  }
}
