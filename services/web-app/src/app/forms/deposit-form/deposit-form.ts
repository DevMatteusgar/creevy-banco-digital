import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {TransfersService} from '../../services/transfers-service';
import {AccountInfoDtoResponse} from '../../interfaces/AccountInfoDtoResponse';


@Component({
  selector: 'app-deposit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './deposit-form.html',
  styleUrl: './deposit-form.css',
})
export class DepositForm implements OnInit {

  depositForm!: FormGroup;

  accountInfo: AccountInfoDtoResponse = {
    accountId: 0,
    accountName: '',
    accountCpf: ''
  };

  carregando: boolean = true;
  erro: string = '';
  processando: boolean = false;
  sucesso: boolean = false;
  mensagemSucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private transfersService: TransfersService
  ) {
    this.depositForm = this.fb.group({
      quantia: ['', [
        Validators.required,
        Validators.min(0.01),
        this.valorPositivoValidator
      ]]
    });

    this.depositForm.get('quantia')?.valueChanges.subscribe(valor => {
      if (valor && typeof valor === 'string' && !valor.includes(',')) {
        const valorFormatado = this.formatarMoedaString(valor);
        this.depositForm.get('quantia')?.setValue(valorFormatado, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.buscarDadosConta();
  }

  valorPositivoValidator(control: any) {
    if (!control.value) return null;

    const valor = parseFloat(
      control.value.toString().replace(/\./g, '').replace(',', '.')
    );

    return valor > 0 ? null : { valorInvalido: true };
  }

  buscarDadosConta() {
    this.carregando = true;
    this.erro = '';

    this.transfersService.getMyInfo().subscribe({
      next: (dados) => {
        this.accountInfo = dados;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar dados da conta:', error);

        if (error.status === 401) {
          this.erro = 'Sessão expirada. Por favor, faça login novamente.';
        } else if (error.status === 404) {
          this.erro = 'Conta não encontrada.';
        } else {
          this.erro = 'Não foi possível carregar as informações da conta.';
        }

        this.carregando = false;
      }
    });
  }

  realizarDeposito() {
    if (this.depositForm.invalid) {
      this.depositForm.markAllAsTouched();
      return;
    }

    this.processando = true;
    this.sucesso = false;
    this.erro = '';

    const quantiaFormatada = this.depositForm.get('quantia')?.value;
    const valorNumerico = this.converterParaNumero(quantiaFormatada);

    this.transfersService.deposit(valorNumerico).subscribe({
      next: (response) => {
        this.sucesso = true;
        this.mensagemSucesso = response.message || 'Depósito realizado com sucesso!';
        this.processando = false;
        this.depositForm.reset();
        this.buscarDadosConta();

        setTimeout(() => {
          this.sucesso = false;
          this.mensagemSucesso = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Erro ao realizar depósito:', error);
        this.processando = false;

        if (error.status === 401) {
          this.erro = 'Sessão expirada. Por favor, faça login novamente.';
        } else if (error.status === 400) {
          this.erro = error.error?.message || 'Dados inválidos. Verifique o valor do depósito.';
        } else if (error.status === 500) {
          this.erro = 'Erro no servidor. Tente novamente mais tarde.';
        } else {
          this.erro = 'Não foi possível realizar o depósito. Tente novamente.';
        }
      }
    });
  }

  formatarMoeda(event: any) {
    let valor = event.target.value;
    valor = valor.replace(/\D/g, '');

    if (valor === '') {
      this.depositForm.get('quantia')?.setValue('', { emitEvent: false });
      return;
    }

    const valorFormatado = this.formatarMoedaString(valor);
    this.depositForm.get('quantia')?.setValue(valorFormatado, { emitEvent: false });
  }

  private formatarMoedaString(valor: string): string {
    valor = valor.replace(/\D/g, '');
    if (valor === '') return '';

    const valorDecimal = (parseFloat(valor) / 100).toFixed(2);
    let valorFormatado = valorDecimal.replace('.', ',');
    valorFormatado = valorFormatado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    return valorFormatado;
  }

  converterParaNumero(valorFormatado: string): number {
    if (!valorFormatado) return 0;
    return parseFloat(valorFormatado.replace(/\./g, '').replace(',', '.'));
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  get quantia() {
    return this.depositForm.get('quantia');
  }

  get quantiaInvalida(): boolean {
    return !!(this.quantia?.invalid && this.quantia?.touched);
  }

  get formularioValido(): boolean {
    return this.depositForm.valid;
  }
}
