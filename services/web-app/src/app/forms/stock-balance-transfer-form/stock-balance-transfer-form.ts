import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BalanceService } from '../../services/balance-service/balance-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-balance-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './stock-balance-transfer-form.html',
  styleUrl: './stock-balance-transfer-form.css',
})
export class StockBalanceTransferForm implements OnInit {

  transferForm!: FormGroup;

  notification: { type: 'success' | 'error', message: string } | null = null;
  amountFormatted: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      transferType: ['savingsToInvestments', Validators.required],
      amount: ['', [Validators.required, this.valuePositiveValidator]]
    });
  }

  // Validação de valor positivo
  valuePositiveValidator(control: any) {
    if (!control.value) return null;

    const numeric = parseFloat(
      control.value.toString().replace(/\./g, '').replace(',', '.')
    );

    return numeric > 0 ? null : { invalidValue: true };
  }

  // Formatação BRL
  formatCurrency(event: any) {
    let raw = event.target.value.replace(/\D/g, '');

    if (raw === '') {
      this.amountFormatted = '';
      this.transferForm.get('amount')?.setValue('');
      return;
    }

    const formatted = this.formatCurrencyString(raw);

    this.amountFormatted = formatted;
    this.transferForm.get('amount')?.setValue(formatted, { emitEvent: false });
  }

  private formatCurrencyString(value: string): string {
    const decimal = (parseFloat(value) / 100).toFixed(2);
    let formatted = decimal.replace('.', ',');
    formatted = formatted.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return formatted;
  }

  convertToNumber(formattedValue: string): number {
    if (!formattedValue) return 0;
    return parseFloat(formattedValue.replace(/\./g, '').replace(',', '.'));
  }

  submitTransfer() {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.notification = null;

    const type = this.transferForm.get('transferType')?.value;
    const amount = this.convertToNumber(this.transferForm.get('amount')?.value);

    let request$ =
      type === 'savingsToInvestments'
        ? this.balanceService.transferSavingsToInvestments(amount)
        : this.balanceService.transferInvestmentsToSavings(amount);

    request$.subscribe({
      next: (res) => {
        this.notification = {
          type: 'success',
          message: res.message || 'Transferência realizada com sucesso!'
        };

        this.isLoading = false;
        this.transferForm.reset({ transferType: 'savingsToInvestments' });
        this.amountFormatted = '';

        setTimeout(() => this.notification = null, 5000);
      },
      error: (err) => {
        this.notification = {
          type: 'error',
          message: err.error?.message || 'Não foi possível realizar a transferência. Tente novamente.'
        };

        this.isLoading = false;

        setTimeout(() => this.notification = null, 5000);
      }
    });
  }

  closeNotification() {
    this.notification = null;
  }
}
