import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {AuthDtoResponse} from '../../interfaces/AuthDtoResponse';
import {LoginDtoRequest} from '../../interfaces/LoginDtoRequest';
import {RegisterDtoRequest} from '../../interfaces/RegisterDtoRequest';
import {RegisterDtoResponse} from '../../interfaces/RegisterDtoResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl: string = 'http://192.168.56.10:8080/auth'
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Registro de novo usuário
  register(data: RegisterDtoRequest): Observable<RegisterDtoResponse> {
    return this.http.post<RegisterDtoResponse>(`${this.apiUrl}/register`, data);
  }

  // Login do usuário
  login(data: LoginDtoRequest): Observable<AuthDtoResponse> {
    return this.http.post<AuthDtoResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        // Salva o token no localStorage quando o login é bem-sucedido
        this.setToken(response.token);
      })
    );
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  // Gerenciamento do token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Verifica se o token não está expirado
    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  // Decodifica o token JWT (apenas a payload)
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  // Obtém dados do usuário do token
  getUserFromToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return this.decodeToken(token);
  }

}
