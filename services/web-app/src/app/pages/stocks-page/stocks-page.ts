import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {BuyStockDashboard} from '../../dashboards/buy-stock-dashboard/buy-stock-dashboard';
import {StockTransactionsTable} from '../../tables/stock-transactions-table/stock-transactions-table';
import {StockBalanceTransferForm} from '../../forms/stock-balance-transfer-form/stock-balance-transfer-form';

@Component({
  selector: 'app-stocks-page',
  imports: [
    NavbarLayout,
    BuyStockDashboard,
    StockBalanceTransferForm
  ],
  templateUrl: './stocks-page.html',
  styleUrl: './stocks-page.css',
})
export class StocksPage {

}
