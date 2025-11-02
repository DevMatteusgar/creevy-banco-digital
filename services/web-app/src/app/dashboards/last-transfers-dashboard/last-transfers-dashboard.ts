import { Component } from '@angular/core';
import {LastTransfersTable} from '../../tables/last-transfers-table/last-transfers-table';

@Component({
  selector: 'app-last-transfers-dashboard',
  standalone: true,
  imports: [
    LastTransfersTable
  ],
  templateUrl: './last-transfers-dashboard.html',
  styleUrl: './last-transfers-dashboard.css',
})
export class LastTransfersDashboard {

}
