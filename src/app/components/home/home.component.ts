import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginCard = true;

  // Propriedades para o formulário de login
  email!: string;
  password!: string;

  // Propriedades para o formulário de cadastro
  name!: string;
  emailSignup!: string;
  passwordSignup!: string;

  onSubmitLoginForm(): void {
    console.log('Dados do formulário de login:', { email: this.email, password: this.password });
  }

  onSubmitSignupForm(): void {
    console.log(
      'Dados do formulário de criação de conta:',
      { name: this.name, email: this.emailSignup, password: this.passwordSignup }
    );
  }
}