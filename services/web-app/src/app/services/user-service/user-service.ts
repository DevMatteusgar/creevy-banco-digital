import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AccountInfoDtoResponse} from '../../interfaces/AccountInfoDtoResponse';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl: string = 'http://192.168.56.10:8080/user'

  constructor(private http: HttpClient) {}

  //Retorna as informações do usuário ativo
  getMyInfo(): Observable<AccountInfoDtoResponse> {
    return this.http.get<AccountInfoDtoResponse>(`${this.userApiUrl}/myInfo`);
  }
}
