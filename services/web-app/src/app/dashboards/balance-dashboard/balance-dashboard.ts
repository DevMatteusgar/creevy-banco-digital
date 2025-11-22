// balance-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../services/balance-service/balance-service';
import { UserBalanceResponse } from '../../interfaces/UserBalanceResponse';

@Component({
  selector: 'app-balance-dashboard',
  imports: [CommonModule],
  templateUrl: './balance-dashboard.html',
  styleUrl: './balance-dashboard.css',
})
export class BalanceDashboard implements OnInit {

  saldoTotal: number = 0;
  poupanca: number = 0;
  investimentos: number = 0;
  porcentagemInvestimentos: number = 0;
  dataAtualizacao: string = '-';
  carregando: boolean = false;
  erro: string = '';

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erro = '';

    this.balanceService.getMyBalance().subscribe({
      next: (response: UserBalanceResponse) => {
        this.saldoTotal = response.totalBalance;
        this.poupanca = response.savingsBalance;
        this.investimentos = response.investmentsBalance;

        if (this.saldoTotal > 0) {
          this.porcentagemInvestimentos = (this.investimentos / this.saldoTotal) * 100;
        }

        this.atualizarDataHora();
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar saldo:', error);
        this.erro = 'Não foi possível carregar os dados. Tente novamente.';
        this.carregando = false;
      }
    });
  }

  private atualizarDataHora(): void {
    const agora = new Date();
    this.dataAtualizacao = agora.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  atualizar(): void {
    console.log('Atualizando dashboard...');
    this.carregarDados();
  }

  exportar(): void {
    console.log('Exportar dados');
    // Implementar exportação futuramente
  }
}
