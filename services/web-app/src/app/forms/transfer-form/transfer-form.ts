import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransfersService } from '../../services/transfers-service';
import { AccountInfoDtoResponse } from '../../interfaces/AccountInfoDtoResponse';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './transfer-form.html',
  styleUrl: './transfer-form.css',
})
export class TransferForm implements OnInit {

  transferForm!: FormGroup;

  accountInfo: AccountInfoDtoResponse = {
    accountId: 0,
    accountName: '',
    accountCpf: ''
  };

  // Informações da conta destino
  destinationAccountInfo: AccountInfoDtoResponse | null = null;
  buscandoContaDestino: boolean = false;
  erroContaDestino: string = '';

  carregando: boolean = true;
  erro: string = '';
  processando: boolean = false;
  sucesso: boolean = false;
  mensagemSucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private transfersService: TransfersService
  ) {
    this.transferForm = this.fb.group({
      contaDestino: ['', [Validators.required, Validators.min(1)]],
      quantia: ['', [
        Validators.required,
        Validators.min(0.01),
        this.valorPositivoValidator
      ]]
    });

    // Formata a quantia conforme o usuário digita
    this.transferForm.get('quantia')?.valueChanges.subscribe(valor => {
      if (valor && typeof valor === 'string' && !valor.includes(',')) {
        const valorFormatado = this.formatarMoedaString(valor);
        this.transferForm.get('quantia')?.setValue(valorFormatado, { emitEvent: false });
      }
    });

    // Busca informações da conta destino quando o usuário digitar o ID
    this.transferForm.get('contaDestino')?.valueChanges.subscribe(contaId => {
      if (contaId && contaId > 0) {
        this.buscarInfoContaDestino(contaId);
      } else {
        this.destinationAccountInfo = null;
        this.erroContaDestino = '';
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

  //Metodo para buscar informações da conta destino
  buscarInfoContaDestino(contaId: number) {
    this.buscandoContaDestino = true;
    this.erroContaDestino = '';
    this.destinationAccountInfo = null;

    this.transfersService.getTransferUserInfo(contaId).subscribe({
      next: (dados) => {
        this.destinationAccountInfo = dados;
        this.buscandoContaDestino = false;
      },
      error: (error) => {
        console.error('Erro ao buscar dados da conta destino:', error);
        this.buscandoContaDestino = false;

        if (error.status === 404) {
          this.erroContaDestino = 'Conta destino não encontrada.';
        } else if (error.status === 401) {
          this.erroContaDestino = 'Sessão expirada.';
        } else {
          this.erroContaDestino = 'Erro ao buscar informações da conta.';
        }

        this.destinationAccountInfo = null;
      }
    });
  }

  realizarTransferencia() {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    // Validação adicional: não permitir transferência para a mesma conta
    const contaDestino = this.transferForm.get('contaDestino')?.value;
    if (contaDestino === this.accountInfo.accountId) {
      this.erro = 'Não é possível transferir para a mesma conta.';
      return;
    }

    this.processando = true;
    this.sucesso = false;
    this.erro = '';

    const quantiaFormatada = this.transferForm.get('quantia')?.value;
    const valorNumerico = this.converterParaNumero(quantiaFormatada);

    this.transfersService.transfer(contaDestino, valorNumerico).subscribe({
      next: (response) => {
        this.sucesso = true;
        this.mensagemSucesso = response.message || 'Transferência realizada com sucesso!';
        this.processando = false;
        this.transferForm.reset();
        this.destinationAccountInfo = null;
        this.buscarDadosConta();

        setTimeout(() => {
          this.sucesso = false;
          this.mensagemSucesso = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Erro ao realizar transferência:', error);
        this.processando = false;

        if (error.status === 401) {
          this.erro = 'Sessão expirada. Por favor, faça login novamente.';
        } else if (error.status === 400) {
          this.erro = error.error?.message || 'Dados inválidos. Verifique os campos.';
        } else if (error.status === 500) {
          this.erro = 'Erro no servidor. Tente novamente mais tarde.';
        } else {
          this.erro = 'Não foi possível realizar a transferência. Tente novamente.';
        }
      }
    });
  }

  formatarMoeda(event: any) {
    let valor = event.target.value;
    valor = valor.replace(/\D/g, '');

    if (valor === '') {
      this.transferForm.get('quantia')?.setValue('', { emitEvent: false });
      return;
    }

    const valorFormatado = this.formatarMoedaString(valor);
    this.transferForm.get('quantia')?.setValue(valorFormatado, { emitEvent: false });
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

  get contaDestino() {
    return this.transferForm.get('contaDestino');
  }

  get quantia() {
    return this.transferForm.get('quantia');
  }

  get quantiaInvalida(): boolean {
    return !!(this.quantia?.invalid && this.quantia?.touched);
  }

  get formularioValido(): boolean {
    return this.transferForm.valid && !this.erroContaDestino;
  }
}
