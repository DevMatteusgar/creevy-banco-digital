import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {CommonModule} from '@angular/common';
import {BalanceDashboard} from '../../dashboards/balance-dashboard/balance-dashboard';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NavbarLayout,
    CommonModule,
    BalanceDashboard,

  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {

  activeTab: string = 'my-balance';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
