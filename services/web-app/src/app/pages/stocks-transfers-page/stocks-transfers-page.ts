import { Component } from '@angular/core';
import {StockTransactionsTable} from '../../tables/stock-transactions-table/stock-transactions-table';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';

@Component({
  selector: 'app-stocks-transfers-page',
  imports: [
    NavbarLayout,
    StockTransactionsTable
  ],
  templateUrl: './stocks-transfers-page.html',
  styleUrl: './stocks-transfers-page.css',
})
export class StocksTransfersPage {

}
