import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {RegisterValidators} from '../../validators/register-validators';
import {RouterModule} from '@angular/router';

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
  formData: any = null;

  constructor(private fb: FormBuilder) {
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

  // Getters para facilitar o acesso aos controles no template
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
      this.submitted = true;
      this.formData = this.registrationForm.value;
      console.log('Formulário enviado:', this.formData);
    }
  }

  resetForm() {
    this.registrationForm.reset();
    this.submitted = false;
    this.formData = null;
  }

}
