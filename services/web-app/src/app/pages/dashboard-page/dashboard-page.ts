import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {CommonModule} from '@angular/common';
import {BalanceDashboard} from '../../dashboards/balance-dashboard/balance-dashboard';
import {LastTransfersDashboard} from '../../dashboards/last-transfers-dashboard/last-transfers-dashboard';
import {LastTransfersTable} from '../../tables/last-transfers-table/last-transfers-table';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NavbarLayout,
    CommonModule,
    BalanceDashboard,
    LastTransfersDashboard,
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
