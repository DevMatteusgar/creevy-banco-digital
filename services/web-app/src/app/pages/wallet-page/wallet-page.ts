import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {WalletBalanceDashboard} from '../../dashboards/wallet-balance-dashboard/wallet-balance-dashboard';
import {WalletStocksTable} from '../../tables/wallet-stocks-table/wallet-stocks-table';

@Component({
  selector: 'app-wallet-page',
  imports: [
    NavbarLayout,
    WalletBalanceDashboard,
    WalletStocksTable
  ],
  templateUrl: './wallet-page.html',
  styleUrl: './wallet-page.css',
})
export class WalletPage {

}
