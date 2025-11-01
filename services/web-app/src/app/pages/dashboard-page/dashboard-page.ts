import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    NavbarLayout,
    CommonModule

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
