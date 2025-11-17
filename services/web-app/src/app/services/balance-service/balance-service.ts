import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBalanceResponse} from '../../interfaces/UserBalanceResponse';
import {BalanceHistory} from '../../interfaces/BalanceHistory';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {

  private userBalanceApiUrl: string = 'http://192.168.56.10:8080/balance'

  constructor(private http: HttpClient) {}

  getMyBalance(): Observable<UserBalanceResponse> {
    const token = localStorage.getItem('token'); // ou sessionStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<UserBalanceResponse>(`${this.userBalanceApiUrl}/myBalance`, { headers });
  }

  getBalanceHistory(): Observable<BalanceHistory[]> {
    const token = localStorage.getItem('token'); // ou sessionStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<BalanceHistory[]>(`${this.userBalanceApiUrl}/myBalanceHistory`, { headers });
  }

  getBalanceHistoryByTransfer(): Observable<BalanceHistory[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<BalanceHistory[]>(`${this.userBalanceApiUrl}/myBalanceHistoryByTransfer`, { headers });
  }

  transferSavingsToInvestments(amount: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(
      `${this.userBalanceApiUrl}/transferSavingsToInvestments`,
      { amount },
      { headers }
    );
  }

  transferInvestmentsToSavings(amount: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      `${this.userBalanceApiUrl}/transferInvestmentsToSavings`,
      { amount },
      { headers }
    );
  }
}
