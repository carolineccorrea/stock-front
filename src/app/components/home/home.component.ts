import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user/user.service';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { CookieService } from 'ngx-cookie-service';

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
  
  constructor(
    private userService: UserService,
    private router: Router,
    private cookie: CookieService
  ) {}


  onSubmitLoginForm(): void {
    const authRequest: AuthRequest = {
      email: this.email,
      password: this.password
    };
  
    this.userService.authUser(authRequest).subscribe({
      next: (response) => {
        // Aqui você pode armazenar o JWT TOKEN em cookies ou local storage conforme sua preferência
        this.cookie.set('USER_INFO', response.token);
        this.router.navigate(['/dashboard']); // Redireciona para a página de dashboard
      },
      error: (error) => {
        // Tratamento de erro
        console.error('Erro de autenticação', error);
      }
    });
  }
  

  onSubmitSignupForm(): void {
    console.log(
      'Dados do formulário de criação de conta:',
      { name: this.name, email: this.emailSignup, password: this.passwordSignup }
    );
  }
}