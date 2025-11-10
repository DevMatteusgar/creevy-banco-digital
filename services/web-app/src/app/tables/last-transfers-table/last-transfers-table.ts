import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransfersService } from '../../services/transfer-service/transfers-service';
import { TransferModel } from '../../interfaces/TransferModel';

@Component({
  selector: 'app-last-transfers-table',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './last-transfers-table.html',
  styleUrls: ['./last-transfers-table.css'],
})
export class LastTransfersTable implements OnInit {

  transfers: TransferModel[] = [];
  carregando: boolean = false;
  erro: string | null = null;

  constructor(private transfersService: TransfersService) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.carregando = true;
    this.erro = null;

    this.transfersService.getMyTransfers().subscribe({
      next: (dados) => {
        // Ordena do mais recente para o mais antigo
        this.transfers = dados.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.carregando = false;
        console.log('Transferências carregadas:', this.transfers);
      },
      error: (erro) => {
        console.error('Erro ao carregar transferências:', erro);
        this.erro = 'Não foi possível carregar as transferências.';
        this.carregando = false;
      }
    });
  }

  // Limita às últimas 5 transações
  get transacoesLimitadas(): TransferModel[] {
    return this.transfers.slice(0, 5);
  }

  get valorTotal(): number {
    return this.transfers.reduce((sum, t) => sum + (t.amount || 0), 0);
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarData(data: string): string {
    const date = new Date(data);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
