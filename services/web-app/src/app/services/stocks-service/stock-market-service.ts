import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMarketInfo } from '../../interfaces/StockMarketInfo';
import {StocksBuyResponse} from '../../interfaces/StocksBuyResponse';
import {StocksBuyRequest} from '../../interfaces/StocksBuyRequest';
import {StocksTransferResponse} from '../../interfaces/StocksTransferResponse';

@Injectable({
  providedIn: 'root'
})
export class StockMarketService {
  private apiUrl = 'http://192.168.56.10:8080/stocks';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllFixedStocks(): Observable<StockMarketInfo[]> {
    const url = `${this.apiUrl}/listAllStocksInfo`;
    return this.http.get<StockMarketInfo[]>(url, { headers: this.getHeaders() });
  }

  buyStock(stockIdentifier: string, stockQuantity: number): Observable<StocksBuyResponse> {
    const url = `${this.apiUrl}/buy`;
    const body: StocksBuyRequest = {
      stockQuantity,
      stockIdentifier
    };
    return this.http.post<StocksBuyResponse>(url, body, { headers: this.getHeaders() });
  }

  getAllTransactions(): Observable<StocksTransferResponse[]> {
    const url = `${this.apiUrl}/listAllTransactions`;
    return this.http.get<StocksTransferResponse[]>(url, { headers: this.getHeaders() });
  }
}
