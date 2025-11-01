import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {

  /**
   * Validador para CPF brasileiro
   * Verifica se o CPF é válido de acordo com o algoritmo de validação
   */
  static cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value?.replace(/\D/g, ''); // Remove caracteres não numéricos

      if (!cpf || cpf.length !== 11) {
        return { invalidCpf: true };
      }

      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1{10}$/.test(cpf)) {
        return { invalidCpf: true };
      }

      // Validação dos dígitos verificadores
      let sum = 0;
      let remainder;

      // Valida o primeiro dígito verificador
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(9, 10))) {
        return { invalidCpf: true };
      }

      // Valida o segundo dígito verificador
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.substring(10, 11))) {
        return { invalidCpf: true };
      }

      return null;
    };
  }

  /**
   * Validador para senha numérica com quantidade específica de dígitos
   * @param length - Número de dígitos exigidos (padrão: 4)
   */
  static numericPassword(length: number = 4): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null; // Deixa a validação de required lidar com valores vazios
      }

      // Verifica se contém apenas números
      if (!/^\d+$/.test(value)) {
        return { nonNumeric: true };
      }

      // Verifica o comprimento
      if (value.length < length) {
        return { minLength: { requiredLength: length, actualLength: value.length } };
      }

      if (value.length > length) {
        return { maxLength: { requiredLength: length, actualLength: value.length } };
      }

      return null;
    };
  }
}
