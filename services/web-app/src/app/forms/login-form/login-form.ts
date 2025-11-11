import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RegisterValidators } from '../../validators/register-validators';
import {AuthService} from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string | null = null;
  returnUrl: string = '/';
  formData: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
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

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get password() {
    return this.loginForm.get('password');
  }

  get cpf() {
    return this.loginForm.get('cpf');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      this.formData = this.loginForm.value;

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.submitted = true;
          console.log('Login realizado com sucesso');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;

          console.error('Erro no login:', error);

          // Primeiro tenta pegar a mensagem específica do backend
          if (error.error && typeof error.error === 'object') {
            // Tenta pegar error.error.error (como no seu caso: {error: 'Senha não confere'})
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
          if (error.status === 401) {
            this.errorMessage = 'CPF ou senha inválidos. Verifique seus dados e tente novamente.';
          } else if (error.status === 403) {
            this.errorMessage = 'Acesso negado. Sua conta pode estar bloqueada.';
          } else if (error.status === 404) {
            this.errorMessage = 'Usuário não encontrado. Verifique seu CPF.';
          } else if (error.status === 409) {
            this.errorMessage = 'Conflito nos dados. Verifique suas credenciais.';
          } else if (error.status === 500) {
            this.errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          } else if (error.status === 0) {
            this.errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
          } else {
            this.errorMessage = 'Erro ao realizar login. Tente novamente.';
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;
    this.errorMessage = null;
    this.formData = null;
  }
}
