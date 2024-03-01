import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

// Defina a interface para um Cliente
export interface Customer {
  id: string;
  name: string;
  cpf: string;
  // Adicione outras propriedades relevantes
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  searchCustomers(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.API_URL}/customers/search`, {
      params: { query: query },
      ...this.httpOptions
    });
  }

}
