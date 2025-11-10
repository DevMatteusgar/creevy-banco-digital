import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransfersService } from '../../services/transfer-service/transfers-service';
import { TransferModel } from '../../interfaces/TransferModel';
import { TransfersTableFilters } from '../../interfaces/TransfersTableFilters';

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
        console.log('Dados recebidos:', dados[0]); // DEBUG: veja o formato da data

        // Ordena do mais recente para o mais antigo
        this.transacoes = dados.sort((a, b) =>
          this.converterParaDate(b.date).getTime() - this.converterParaDate(a.date).getTime()
        );
        this.aplicarFiltros();
      },
      error: (erro) => {
        console.error('Erro ao carregar transferências:', erro);
      }
    });
  }

  aplicarFiltros(): void {
    this.transacoesFiltradas = this.transacoes.filter(transacao => {
      // Filtro por destinatário
      if (this.filtros.destinatario &&
        !transacao.receiverName?.toLowerCase().includes(this.filtros.destinatario.toLowerCase())) {
        return false;
      }

      // Converte a data da transação para comparação
      const dataTransacao = this.converterParaDate(transacao.date);
      const dataTransacaoSemHora = new Date(dataTransacao.getFullYear(), dataTransacao.getMonth(), dataTransacao.getDate());

      // Filtro por data mínima
      if (this.filtros.dataMin) {
        const dataMin = new Date(this.filtros.dataMin + 'T00:00:00');
        if (dataTransacaoSemHora < dataMin) {
          return false;
        }
      }

      // Filtro por data máxima
      if (this.filtros.dataMax) {
        const dataMax = new Date(this.filtros.dataMax + 'T23:59:59');
        if (dataTransacaoSemHora > dataMax) {
          return false;
        }
      }

      // Filtro por valor mínimo
      if (this.filtros.valorMin !== null && transacao.amount < this.filtros.valorMin) {
        return false;
      }

      // Filtro por valor máximo
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

  /**
   * Converte string de data para objeto Date
   * Trata casos com ou sem timezone
   */
  private converterParaDate(dataString: string): Date {
    // Se já tiver timezone (+/-), usa direto
    if (dataString.includes('+') || dataString.includes('-') || dataString.endsWith('Z')) {
      return new Date(dataString);
    }

    // Se não tiver timezone, assume que é horário local (não UTC)
    // Adiciona 'T' se não tiver e força interpretação local
    const dataComT = dataString.includes('T') ? dataString : dataString.replace(' ', 'T');
    return new Date(dataComT + '-03:00'); // Força timezone de Brasília
  }

  /**
   * Formata data para exibição
   */
  formatarData(data: string): string {
    const dataObj = this.converterParaDate(data);

    return dataObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo' // Garante que exibe no horário de Brasília
    });
  }

  /** Define se a transação é positiva (Depósito) ou negativa (TransferSend) */
  isPositiva(transacao: TransferModel): boolean {
    return transacao.operationType === 'Deposit';
  }
}
