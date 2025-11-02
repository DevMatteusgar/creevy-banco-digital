import { Routes } from '@angular/router';
import {RegisterPage} from './pages/register-page/register-page';
import {LoginPage} from './pages/login-page/login-page';
import {DashboardPage} from './pages/dashboard-page/dashboard-page';
import {TransferPage} from './pages/transfer-page/transfer-page';
import {DepositPage} from './pages/deposit-page/deposit-page';
import {BalancePage} from './pages/balance-page/balance-page';
import {WalletPage} from './pages/wallet-page/wallet-page';
import {StocksPage} from './pages/stocks-page/stocks-page';
import {ChartsPage} from './pages/charts-page/charts-page';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {path: 'register', component: RegisterPage},
  {path: 'login', component: LoginPage},
  {path: 'home', component: DashboardPage},
  {path: 'transfer', component: TransferPage},
  {path: 'deposit', component: DepositPage},
  {path: 'balance', component: BalancePage},
  {path: 'wallet', component: WalletPage},
  {path: 'stocks', component: StocksPage},
  {path: 'charts', component: ChartsPage}
];
