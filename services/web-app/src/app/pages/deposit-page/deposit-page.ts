import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {DepositForm} from '../../forms/deposit-form/deposit-form';
import {LastTransfersTable} from '../../tables/last-transfers-table/last-transfers-table';
import {TransferForm} from '../../forms/transfer-form/transfer-form';

@Component({
  selector: 'app-deposit-page',
  imports: [
    NavbarLayout,
    DepositForm,
    LastTransfersTable,
  ],
  templateUrl: './deposit-page.html',
  styleUrl: './deposit-page.css',
})
export class DepositPage {

}
