import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface AccountInfo {
  accountId: number;
  accountName: string;
  accountCpf: string;
}

@Component({
  selector: 'app-deposit-form',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './deposit-form.html',
  styleUrl: './deposit-form.css',
})
export class DepositForm {

  accountInfo: AccountInfo = {
    accountId: 0,
    accountName: '',
    accountCpf: ''
  };
  quantia: string = '';
  carregando: boolean = true;
  erro: string = '';
  processando: boolean = false;
  sucesso: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.buscarDadosConta();
  }

  buscarDadosConta() {
    // Substitua pela URL da sua API
    const apiUrl = 'https://api.exemplo.com/conta/info';

    this.http.get<AccountInfo>(apiUrl).subscribe({
      next: (dados) => {
        this.accountInfo = dados;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar dados da conta:', error);
        this.erro = 'Não foi possível carregar as informações da conta.';
        this.carregando = false;

        // SIMULAÇÃO: Remova esta parte em produção
        // Dados mockados para teste
        setTimeout(() => {
          this.erro = '';
          this.accountInfo = {
            donoConta: 'João da Silva',
            numeroConta: '12345-6'
          };
          this.carregando = false;
        }, 1000);
      }
    });
  }

  // Formatar valor no padrão brasileiro
  formatarMoeda(event: any) {
    let valor = event.target.value;

    // Remove tudo que não é número
    valor = valor.replace(/\D/g, '');

    // Converte para número e divide por 100 para ter os centavos
    valor = (parseFloat(valor) / 100).toFixed(2);

    // Formata no padrão brasileiro
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.quantia = valor;
  }

  // Converter valor formatado para número
  converterParaNumero(valorFormatado: string): number {
    return parseFloat(valorFormatado.replace(/\./g, '').replace(',', '.'));
  }

  // Validar se o formulário é válido
  isFormularioValido(): boolean {
    const valorNumerico = this.converterParaNumero(this.quantia);
    return !isNaN(valorNumerico) && valorNumerico > 0;
  }

  realizarDeposito() {
    if (!this.isFormularioValido()) {
      return;
    }

    this.processando = true;
    this.sucesso = false;

    const valorNumerico = this.converterParaNumero(this.quantia);

    const depositoData = {
      numeroConta: this.accountInfo.accountId,
      quantia: valorNumerico
    };

    // Substitua pela URL da sua API
    const apiUrl = 'https://api.exemplo.com/deposito';

    this.http.post(apiUrl, depositoData).subscribe({
      next: (response) => {
        console.log('Depósito realizado:', response);
        this.sucesso = true;
        this.processando = false;
        this.quantia = '';

        setTimeout(() => {
          this.sucesso = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Erro ao realizar depósito:', error);
        this.erro = 'Não foi possível realizar o depósito. Tente novamente.';
        this.processando = false;

        // SIMULAÇÃO: Remova esta parte em produção
        setTimeout(() => {
          this.erro = '';
          this.sucesso = true;
          this.processando = false;
          this.quantia = '';
        }, 1000);
      }
    });
  }
}
