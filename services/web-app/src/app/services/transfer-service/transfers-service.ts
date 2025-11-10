import { Injectable } from '@angular/core';
import {DepositForm} from '../../forms/deposit-form/deposit-form';
import {AccountInfoDtoResponse} from '../../interfaces/AccountInfoDtoResponse';
import {DepositDtoRequest} from '../../interfaces/DepositDtoRequest';
import {DepositDtoResponse} from '../../interfaces/DepositDtoResponse';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransferDtoRequest} from '../../interfaces/TransferDtoRequest';
import {TransferDtoResponse} from '../../interfaces/TransferDtoResponse';
import {TransferModel} from '../../interfaces/TransferModel';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {

  private balanceApiUrl: string = 'http://192.168.56.10:8080/balance'
  private userApiUrl: string = 'http://192.168.56.10:8080/user'

  constructor(private http: HttpClient) {}

  //Retorna as informações do usuário ativo
  getMyInfo(): Observable<AccountInfoDtoResponse> {
    return this.http.get<AccountInfoDtoResponse>(`${this.userApiUrl}/myInfo`);
  }

  //Retorna os dados do usuário destino para transferência
  getTransferUserInfo(userId: number): Observable<AccountInfoDtoResponse> {
    return this.http.get<AccountInfoDtoResponse>(`${this.userApiUrl}/accountInfo/${userId}`);
  }

  //Realiza um deposito para conta do usuário ativo
  deposit(depositValue: number): Observable<DepositDtoResponse> {
    const depositRequest: DepositDtoRequest = {
      depositValue: depositValue
    };

    return this.http.post<DepositDtoResponse>(
      `${this.balanceApiUrl}/deposit`, depositRequest);
  }

  //Transferência entre contas
  transfer(accountId: number, transferValue: number): Observable<TransferDtoResponse> {
    const transferRequest: TransferDtoRequest = {
      accountId: accountId,
      transferValue: transferValue
    };

    return this.http.post<TransferDtoResponse>(
      `${this.balanceApiUrl}/transfer`, transferRequest
    );
  }

  //Busca todas as transferências do usuário (senderId ou receiverId)
  getAllUserTransfers(userId: number): Observable<TransferModel[]> {
    return this.http.get<TransferModel[]>(
      `${this.balanceApiUrl}/ListAllUserTransfers/${userId}`
    );
  }

  //Lista transferências do usuário autenticado (token JWT)
  getMyTransfers(): Observable<TransferModel[]> {
    return this.http.get<TransferModel[]>(`${this.balanceApiUrl}/ListMyTransfers`);
  }
}
