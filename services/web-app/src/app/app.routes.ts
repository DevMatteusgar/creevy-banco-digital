import { Routes } from '@angular/router';
import {authGuard} from './guards/authGuard/auth-guard-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { LoginPage } from './pages/login-page/login-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { TransferPage } from './pages/transfer-page/transfer-page';
import { DepositPage } from './pages/deposit-page/deposit-page';
import { BalancePage } from './pages/balance-page/balance-page';
import { WalletPage } from './pages/wallet-page/wallet-page';
import { StocksPage } from './pages/stocks-page/stocks-page';
import { ChartsPage } from './pages/charts-page/charts-page';
import {StocksTransfersPage} from './pages/stocks-transfers-page/stocks-transfers-page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'home', component: DashboardPage, canActivate: [authGuard] },
  { path: 'transfer', component: TransferPage, canActivate: [authGuard] },
  { path: 'deposit', component: DepositPage, canActivate: [authGuard] },
  { path: 'balance', component: BalancePage, canActivate: [authGuard] },
  { path: 'wallet', component: WalletPage, canActivate: [authGuard] },
  { path: 'stocks', component: StocksPage, canActivate: [authGuard] },
  { path: 'stocks-transfers', component: StocksTransfersPage, canActivate: [authGuard] },
  { path: 'charts', component: ChartsPage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
