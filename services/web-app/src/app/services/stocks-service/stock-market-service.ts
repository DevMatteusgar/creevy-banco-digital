import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMarketInfo } from '../../interfaces/StockMarketInfo';
import {StocksBuyResponse} from '../../interfaces/StocksBuyResponse';
import {StocksBuyRequest} from '../../interfaces/StocksBuyRequest';
import {StocksTransferResponse} from '../../interfaces/StocksTransferResponse';
import {StocksSummary} from '../../interfaces/StocksSummary';
import {StocksSellResponse} from '../../interfaces/StocksSellResponse';

@Injectable({
  providedIn: 'root'
})
export class StockMarketService {
  private apiUrl = 'http://192.168.56.10:8080/stocks';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  private postHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  }

  getAllFixedStocks(): Observable<StockMarketInfo[]> {
    const url = `${this.apiUrl}/listAllStocksInfo`;
    return this.http.get<StockMarketInfo[]>(url, { headers: this.getHeaders() });
  }

  buyStock(stockIdentifier: string, stockQuantity: number): Observable<StocksBuyResponse> {
    const url = `${this.apiUrl}/buy`;
    const body: StocksBuyRequest = { stockIdentifier, stockQuantity };
    return this.http.post<StocksBuyResponse>(url, body, { headers: this.postHeaders() });
  }

  getAllTransactions(): Observable<StocksTransferResponse[]> {
    const url = `${this.apiUrl}/listAllTransactions`;
    return this.http.get<StocksTransferResponse[]>(url, { headers: this.getHeaders() });
  }

  getMyStocks(): Observable<StocksSummary[]> {
    const url = `${this.apiUrl}/myStocks`;
    return this.http.get<StocksSummary[]>(url, { headers: this.getHeaders() });
  }

  sellStock(stockIdentifier: string, stockQuantity: number): Observable<StocksSellResponse> {
    const url = `${this.apiUrl}/sell`;
    const body = { stockIdentifier, stockQuantity };
    return this.http.post<StocksSellResponse>(url, body, { headers: this.getHeaders() });
  }
}
