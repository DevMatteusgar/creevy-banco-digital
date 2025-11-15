import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMarketInfo } from '../../interfaces/StockMarketInfo';

@Injectable({
  providedIn: 'root'
})
export class StockMarketService {
  private apiUrl = 'http://192.168.56.10:8080/stocks';

  constructor(private http: HttpClient) {}

  getAllFixedStocks(): Observable<StockMarketInfo[]> {
    const url = `${this.apiUrl}/listAllStocksInfo`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<StockMarketInfo[]>(url, { headers });
  }
}
