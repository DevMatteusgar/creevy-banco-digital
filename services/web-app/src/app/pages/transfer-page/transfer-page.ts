import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {TransferForm} from '../../forms/transfer-form/transfer-form';

@Component({
  selector: 'app-transfer-page',
  imports: [
    NavbarLayout,
    TransferForm
  ],
  templateUrl: './transfer-page.html',
  styleUrl: './transfer-page.css',
})
export class TransferPage {

}
