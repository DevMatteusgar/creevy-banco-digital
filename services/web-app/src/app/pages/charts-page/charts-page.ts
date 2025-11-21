import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {ApiChart} from '../../api-charts/api-chart/api-chart';
import {StockMarketGridTable} from '../../tables/stock-market-grid-table/stock-market-grid-table';

@Component({
  selector: 'app-charts-page',
  imports: [
    NavbarLayout,
    ApiChart,
    StockMarketGridTable
  ],
  templateUrl: './charts-page.html',
  styleUrl: './charts-page.css',
})
export class ChartsPage {

}
