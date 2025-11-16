import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockMarketService } from '../../services/stocks-service/stock-market-service';
import { StocksTransferResponse } from '../../interfaces/StocksTransferResponse';

@Component({
  selector: 'app-stock-transactions-table',
  standalone: true,
  imports: [
    CommonModule,     // Necessário para *ngFor e *ngIf
    FormsModule,      // Necessário para ngModel
    CurrencyPipe,     // Pipe de moeda
    DatePipe          // Pipe de data
  ],
  templateUrl: './stock-transactions-table.html',
  styleUrls: ['./stock-transactions-table.css'],
})
export class StockTransactionsTable implements OnInit {

  registros: StocksTransferResponse[] = [];
  filtrados: StocksTransferResponse[] = [];
  dadosPaginados: StocksTransferResponse[] = [];

  // filtros
  filtroNome = '';
  filtroOperacao = '';
  filtroDataInicio: string | null = null;
  filtroDataFim: string | null = null;

  // paginação
  paginaAtual = 1;
  itensPorPagina = 10;
  totalPaginas = 1;
  totalRegistros = 0;

  constructor(private stockService: StockMarketService) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.stockService.getAllTransactions().subscribe((data) => {
      this.registros = data.sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      );

      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.filtrados = this.registros.filter((item) => {
      const nomeOk =
        !this.filtroNome ||
        item.stockIdentifier
          .toLowerCase()
          .includes(this.filtroNome.toLowerCase());

      const operacaoOk =
        !this.filtroOperacao ||
        item.operationType === this.filtroOperacao;

      const dataInicioOk =
        !this.filtroDataInicio ||
        new Date(item.creationDate) >= new Date(this.filtroDataInicio);

      const dataFimOk =
        !this.filtroDataFim ||
        new Date(item.creationDate) <= new Date(this.filtroDataFim);

      return nomeOk && operacaoOk && dataInicioOk && dataFimOk;
    });

    this.totalRegistros = this.filtrados.length;
    this.totalPaginas = Math.ceil(this.totalRegistros / this.itensPorPagina);
    this.paginaAtual = 1;

    this.paginar();
  }

  paginar() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.dadosPaginados = this.filtrados.slice(inicio, fim);
  }

  limparFiltros() {
    this.filtroNome = '';
    this.filtroOperacao = '';
    this.filtroDataInicio = null;
    this.filtroDataFim = null;

    this.aplicarFiltros();
  }
}
