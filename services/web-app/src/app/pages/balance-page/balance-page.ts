import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {TransfersTable} from '../../tables/transfers-table/transfers-table';

@Component({
  selector: 'app-balance-page',
  imports: [
    NavbarLayout,
    TransfersTable
  ],
  templateUrl: './balance-page.html',
  styleUrl: './balance-page.css',
})
export class BalancePage {

}
