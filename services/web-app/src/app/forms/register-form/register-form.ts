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
      this.formData = this.registrationForm.value;

      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          this.submitted = true;
          console.log('Usuário registrado:', response);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Erro ao registrar usuário';
          console.error('Erro no registro:', error);
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
    this.formData = null;
  }
}
