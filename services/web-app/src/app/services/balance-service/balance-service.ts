import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserBalanceResponse } from '../../interfaces/UserBalanceResponse';
import { BalanceHistory } from '../../interfaces/BalanceHistory';
import { UserStocksBalanceResponse } from '../../interfaces/UserStocksBalanceResponse';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {

  private userBalanceApiUrl: string = 'http://192.168.56.10:8080/balance';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getMyBalance(): Observable<UserBalanceResponse> {
    return this.http.get<UserBalanceResponse>(
      `${this.userBalanceApiUrl}/myBalance`,
      { headers: this.getHeaders() }
    );
  }

  getBalanceHistory(): Observable<BalanceHistory[]> {
    return this.http.get<BalanceHistory[]>(
      `${this.userBalanceApiUrl}/myBalanceHistory`,
      { headers: this.getHeaders() }
    );
  }

  getBalanceHistoryByTransfer(): Observable<BalanceHistory[]> {
    return this.http.get<BalanceHistory[]>(
      `${this.userBalanceApiUrl}/myBalanceHistoryByTransfer`,
      { headers: this.getHeaders() }
    );
  }

  transferSavingsToInvestments(amount: number): Observable<any> {
    return this.http.post(
      `${this.userBalanceApiUrl}/transferSavingsToInvestments`,
      { amount },
      { headers: this.getHeaders() }
    );
  }

  transferInvestmentsToSavings(amount: number): Observable<any> {
    return this.http.post(
      `${this.userBalanceApiUrl}/transferInvestmentsToSavings`,
      { amount },
      { headers: this.getHeaders() }
    );
  }

  getMyStocksBalance(): Observable<UserStocksBalanceResponse> {
    return this.http.get<UserStocksBalanceResponse>(
      `${this.userBalanceApiUrl}/myStocksBalance`,
      { headers: this.getHeaders() }
    );
  }
}
