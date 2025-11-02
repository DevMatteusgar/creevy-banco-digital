import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance-dashboard',
  imports: [],
  templateUrl: './balance-dashboard.html',
  styleUrl: './balance-dashboard.css',
})
export class BalanceDashboard {

  saldoTotal: number = 0;
  poupanca: number = 0;
  investimentos: number = 0;
  porcentagemInvestimentos: number = 0;
  dataAtualizacao: string = '-'; //Depois pode ser salvo em localStorage/sessionStorage

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  atualizar(): void {
    // Atualiza a data com a data/hora atual
    const agora = new Date();
    this.dataAtualizacao = agora.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Aqui você pode adicionar a lógica para buscar novos dados
    console.log('Dashboard atualizado em:', this.dataAtualizacao);
  }
}
