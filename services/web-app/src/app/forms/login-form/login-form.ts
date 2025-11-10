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
          //console.log('Token JWT:', response.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'CPF ou senha inválidos';
          console.error('Erro no login:', error);
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
