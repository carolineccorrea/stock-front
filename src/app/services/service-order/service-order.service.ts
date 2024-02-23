import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ServiceOrder {
  equipment: string;
  accessories?: string;
  complaint: string;
  entryDate: Date;
  status: string;
  description: string;
  serialNumber: string;
  condition: string;
  customerId: string;
  underWarranty: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceOrderService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  createServiceOrder(requestData: {}): Observable<ServiceOrder> {
    return this.http.post<ServiceOrder>(
      `${this.API_URL}/serviceorder`,
      requestData,
      this.httpOptions
    );
  }

}
