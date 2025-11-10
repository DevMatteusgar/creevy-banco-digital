import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TransfersService} from '../../services/transfer-service/transfers-service';
import { TransferModel } from '../../interfaces/TransferModel';
import {TransfersTableFilters} from '../../interfaces/TransfersTableFilters';

@Component({
  selector: 'app-transfers-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfers-table.html',
  styleUrls: ['./transfers-table.css'],
})
export class TransfersTable implements OnInit {
  transacoes: TransferModel[] = [];
  transacoesFiltradas: TransferModel[] = [];

  filtros: TransfersTableFilters = {
    destinatario: '',
    dataMin: '',
    dataMax: '',
    valorMin: null,
    valorMax: null
  };

  constructor(private transfersService: TransfersService) {}

  ngOnInit(): void {
    this.carregarTransferencias();
  }

  carregarTransferencias(): void {
    this.transfersService.getMyTransfers().subscribe({
      next: (dados) => {
        this.transacoes = dados;
        this.aplicarFiltros();
      },
      error: (erro) => {
        console.error('Erro ao carregar transferências:', erro);
      }
    });
  }

  aplicarFiltros(): void {
    this.transacoesFiltradas = this.transacoes.filter(transacao => {
      if (this.filtros.destinatario &&
        !transacao.receiverName?.toLowerCase().includes(this.filtros.destinatario.toLowerCase())) {
        return false;
      }

      if (this.filtros.dataMin && transacao.date < this.filtros.dataMin) {
        return false;
      }

      if (this.filtros.dataMax && transacao.date > this.filtros.dataMax) {
        return false;
      }

      if (this.filtros.valorMin !== null && transacao.amount < this.filtros.valorMin) {
        return false;
      }

      if (this.filtros.valorMax !== null && transacao.amount > this.filtros.valorMax) {
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
    return this.transacoesFiltradas.reduce((sum, t) => sum + t.amount, 0);
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /** Define se a transação é positiva (Depósito) ou negativa (TransferSend) */
  isPositiva(transacao: TransferModel): boolean {
    return transacao.operationType === 'Deposit';
  }
}
