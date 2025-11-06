import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {DepositForm} from '../../forms/deposit-form/deposit-form';

@Component({
  selector: 'app-deposit-page',
  imports: [
    NavbarLayout,
    DepositForm
  ],
  templateUrl: './deposit-page.html',
  styleUrl: './deposit-page.css',
})
export class DepositPage {

}
