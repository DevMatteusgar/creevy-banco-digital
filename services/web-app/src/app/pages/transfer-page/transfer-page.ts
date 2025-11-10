import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {TransferForm} from '../../forms/transfer-form/transfer-form';
import {LastTransfersTable} from '../../tables/last-transfers-table/last-transfers-table';

@Component({
  selector: 'app-transfer-page',
  imports: [
    NavbarLayout,
    TransferForm,
    LastTransfersTable
  ],
  templateUrl: './transfer-page.html',
  styleUrl: './transfer-page.css',
})
export class TransferPage {

}
