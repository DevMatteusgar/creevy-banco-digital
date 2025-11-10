import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBalanceResponse} from '../../interfaces/UserBalanceResponse';

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

}
