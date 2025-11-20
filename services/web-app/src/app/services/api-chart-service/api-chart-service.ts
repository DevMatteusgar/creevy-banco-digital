import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  // ======================
  //  HTTP
  // ======================
  getInfo(symbol: string): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.apiUrl}/info/${symbol}`);
  }

  getHistory(symbol: string, months: number = 6): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${symbol}?months=${months}`);
  }

  getIndicators(symbol: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/indicators/${symbol}`);
  }

  // ======================
  // REAL-TIME WEBSOCKET
  // ======================
  connectRealtime(onMessage: (msg: any) => void): void {

    // Evita criar 2 conexões
    if (this.stompClient !== null && this.stompClient.active) {
      return;
    }

    const socket = new SockJS(this.wsUrl);

    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 5000,
      debug: () => {}
    });

    this.stompClient.onConnect = () => {
      console.log("WebSocket conectado");

      this.stompClient!.subscribe('/ws/prices', (message) => {
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
