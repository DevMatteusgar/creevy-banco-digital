import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChartDataResponse } from '../../interfaces/ChartDataResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiChartService {

  private apiUrl = 'http://192.168.56.10:8080/chart';
  private wsUrl  = 'http://192.168.56.10:8080/ws/prices';

  private stompClient: Client | null = null;

  constructor(private http: HttpClient) {}

  // -----------------------------
  // Adiciona JWT no header
  // -----------------------------
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ======================
  // HTTP AUTENTICADO
  // ======================
  getInfo(symbol: string): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(
      `${this.apiUrl}/info/${symbol}`,
      { headers: this.getHeaders() }
    );
  }

  getHistory(symbol: string, months: number = 6): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/history/${symbol}?months=${months}`,
      { headers: this.getHeaders() }
    );
  }

  getIndicators(symbol: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/indicators/${symbol}`,
      { headers: this.getHeaders() }
    );
  }

  // ======================
  // REAL-TIME WEBSOCKET (opcional)
  // ======================
  connectRealtime(onMessage: (msg: any) => void): void {
    if (this.stompClient?.active) return;

    const socket = new SockJS(this.wsUrl);

    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      debug: () => {}
    });

    this.stompClient.onConnect = () => {
      console.log("WebSocket STOMP conectado");
      this.stompClient!.subscribe('/topic/chart/AAPL', (message) => {
        const body = JSON.parse(message.body);
        onMessage(body);
      });
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient?.active) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }
}
