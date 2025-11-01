import { Component } from '@angular/core';
import {RegisterForm} from '../../forms/register-form/register-form';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RegisterForm
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

}
