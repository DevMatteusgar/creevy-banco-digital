import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Transacao {
  id: number;
  data: string;
  destinatario: string;
  conta: string;
  valor: number;
}

interface Filtros {
  destinatario: string;
  dataMin: string;
  dataMax: string;
  valorMin: number | null;
  valorMax: number | null;
}

@Component({
  selector: 'app-transfers-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './transfers-table.html',
  styleUrl: './transfers-table.css',
})
export class TransfersTable implements OnInit {

  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];

  filtros: Filtros = {
    destinatario: '',
    dataMin: '',
    dataMax: '',
    valorMin: null,
    valorMax: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Carrega todos os dados da API uma única vez
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.http.get<Transacao[]>('https://sua-api.com/transacoes')
      .subscribe({
        next: (dados) => {
          this.transacoes = dados;
          this.aplicarFiltros();
        },
        error: (erro) => console.error('Erro ao carregar transações:', erro)
      });
  }

  aplicarFiltros(): void {
    this.transacoesFiltradas = this.transacoes.filter(transacao => {
      // Filtro de destinatário
      if (this.filtros.destinatario &&
        !transacao.destinatario.toLowerCase().includes(this.filtros.destinatario.toLowerCase())) {
        return false;
      }

      // Filtro de data mínima
      if (this.filtros.dataMin && transacao.data < this.filtros.dataMin) {
        return false;
      }

      // Filtro de data máxima
      if (this.filtros.dataMax && transacao.data > this.filtros.dataMax) {
        return false;
      }

      // Filtro de valor mínimo
      if (this.filtros.valorMin !== null && transacao.valor < this.filtros.valorMin) {
        return false;
      }

      // Filtro de valor máximo
      if (this.filtros.valorMax !== null && transacao.valor > this.filtros.valorMax) {
        return false;
      }

      return true;
    });
  }

  limparFiltros(): void {
    this.filtros = {
      destinatario: '',
      dataMin: '',
      dataMax: '',
      valorMin: null,
      valorMax: null
    };
    this.aplicarFiltros();
  }

  get valorTotal(): number {
    return this.transacoesFiltradas.reduce((sum, t) => sum + t.valor, 0);
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
