// wallet-balance-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { UserStocksBalanceResponse } from '../../interfaces/UserStocksBalanceResponse';
import { BalanceService } from '../../services/balance-service/balance-service';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wallet-balance-dashboard',
  imports: [
    CommonModule,
    DecimalPipe,
    CurrencyPipe
  ],
  templateUrl: './wallet-balance-dashboard.html',
  styleUrl: './wallet-balance-dashboard.css',
})
export class WalletBalanceDashboard implements OnInit {

  data!: UserStocksBalanceResponse;
  loading = true;
  error = false;

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance(): void {
    this.loading = true;
    this.error = false;

    this.balanceService.getMyStocksBalance().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar saldo:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  isProfit(): boolean {
    return this.data && this.data.totalProfitValue >= 0;
  }

  getProfitSign(): string {
    return this.isProfit() ? '+' : '';
  }
}
