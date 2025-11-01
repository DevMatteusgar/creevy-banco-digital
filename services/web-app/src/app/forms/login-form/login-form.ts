import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RegisterValidators} from '../../validators/register-validators';

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
export class LoginForm {

  loginForm: FormGroup;
  submitted = false;
  formData: any = null;

  constructor(private fb: FormBuilder) {
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

  get password() {
    return this.loginForm.get('password');
  }

  get cpf() {
    return this.loginForm.get('cpf');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.formData = this.loginForm.value;
      console.log('Formulário enviado:', this.formData);
    }
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;
    this.formData = null;
  }
}
