import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterValidators } from '../../validators/register-validators';
import { RouterModule, Router } from '@angular/router';
import {AuthService} from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {

  registrationForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  formData: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        RegisterValidators.numericPassword(4)
      ]],
      cpf: ['', [
        Validators.required,
        RegisterValidators.cpf()
      ]]
    });
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get cpf() {
    return this.registrationForm.get('cpf');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      this.successMessage = null;
      this.formData = this.registrationForm.value;

      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          this.submitted = true;
          this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
          console.log('Usuário registrado:', response);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;

          console.error('Erro no registro:', error);

          // Primeiro tenta pegar a mensagem específica do backend
          if (error.error && typeof error.error === 'object') {
            // Tenta pegar error.error.error
            if (error.error.error) {
              this.errorMessage = error.error.error;
              return;
            }
            // Tenta pegar error.error.message
            if (error.error.message) {
              this.errorMessage = error.error.message;
              return;
            }
          }

          // Se não encontrou mensagem específica, usa mensagens por status HTTP
          if (error.status === 400) {
            this.errorMessage = 'Dados inválidos. Verifique os campos e tente novamente.';
          } else if (error.status === 409) {
            this.errorMessage = 'CPF ou email já cadastrado. Tente fazer login.';
          } else if (error.status === 422) {
            this.errorMessage = 'Erro de validação. Verifique os dados informados.';
          } else if (error.status === 500) {
            this.errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          } else if (error.status === 0) {
            this.errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
          } else {
            this.errorMessage = 'Erro ao registrar usuário. Tente novamente.';
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  resetForm() {
    this.registrationForm.reset();
    this.submitted = false;
    this.errorMessage = null;
    this.successMessage = null;
    this.formData = null;
  }
}
