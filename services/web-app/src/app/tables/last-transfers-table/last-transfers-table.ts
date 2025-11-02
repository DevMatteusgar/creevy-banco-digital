import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Transacao {
  id: number;
  data: string;
  destinatario: string;
  conta: string;
  valor: number;
}

@Component({
  selector: 'app-last-transfers-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './last-transfers-table.html',
  styleUrl: './last-transfers-table.css',
})
export class LastTransfersTable {

  transfers: Transacao[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // No futuro, carregar dados da API
    // this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.http.get<Transacao[]>('https://sua-api.com/transacoes')
      .subscribe({
        next: (dados) => this.transfers = dados,
        error: (erro) => console.error('Erro ao carregar transações:', erro)
      });
  }

  get transacoesLimitadas(): Transacao[] {
    return this.transfers.slice(0, 5);
  }

  get valorTotal(): number {
    return this.transfers.reduce((sum, t) => sum + t.valor, 0);
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarData(data: string): string {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
  }
}
