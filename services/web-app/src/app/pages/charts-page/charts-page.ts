import { Component } from '@angular/core';
import {NavbarLayout} from '../../layouts/navbar-layout/navbar-layout';
import {ApiChart} from '../../api-charts/api-chart/api-chart';

@Component({
  selector: 'app-charts-page',
  imports: [
    NavbarLayout,
    ApiChart
  ],
  templateUrl: './charts-page.html',
  styleUrl: './charts-page.css',
})
export class ChartsPage {

}
