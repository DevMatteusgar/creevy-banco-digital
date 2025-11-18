import { Component } from '@angular/core';
import {UserStocksBalanceResponse} from '../../interfaces/UserStocksBalanceResponse';
import {BalanceService} from '../../services/balance-service/balance-service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-wallet-balance-dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './wallet-balance-dashboard.html',
  styleUrl: './wallet-balance-dashboard.css',
})
export class WalletBalanceDashboard {

  data!: UserStocksBalanceResponse;
  loading = true;
  error = false;

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.getMyStocksBalance().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
