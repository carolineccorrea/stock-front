import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf e *ngFor
import { ServiceOrder, ServiceOrderService } from '../../../services/service-order/service-order.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarNavigationComponent } from '../../../shared/toolbar-navigation/toolbar-navigation.component';

@Component({
  selector: 'app-service-orders-list',
  standalone: true,
  imports: [ToolbarNavigationComponent, CommonModule, HttpClientModule, TableModule, CardModule, ToastModule],
  templateUrl: './service-orders-list.component.html',
  styleUrls: ['./service-orders-list.component.scss']
})
export class ServiceOrdersListComponent implements OnInit {
  serviceOrders: ServiceOrder[] = [];
  warrantyIcon!: SafeHtml;
  noWarrantyIcon!: SafeHtml;

  constructor(
    private serviceOrderService: ServiceOrderService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadServiceOrders();
    this.loadSvgIcons();
  }

  loadServiceOrders() {
    this.serviceOrderService.getAllServiceOrders().subscribe({
      next: (orders) => this.serviceOrders = orders,
      error: (e) => console.error(e)
    });
  }

  loadSvgIcons() {
    this.http.get('assets/icons/warranty.svg', { responseType: 'text' }).subscribe(data => {
      this.warrantyIcon = this.sanitizer.bypassSecurityTrustHtml(data);
    });

    this.http.get('assets/icons/no-warranty.svg', { responseType: 'text' }).subscribe(data => {
      this.noWarrantyIcon = this.sanitizer.bypassSecurityTrustHtml(data);
    });
  }
}
