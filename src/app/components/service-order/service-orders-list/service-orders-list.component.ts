import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Para diretivas como *ngIf e *ngFor
import { ServiceOrder, ServiceOrderService } from '../../../services/service-order/service-order.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarNavigationComponent } from '../../../shared/toolbar-navigation/toolbar-navigation.component';
@Component({
  selector: 'app-service-orders-list',
  standalone: true,
  imports: [ToolbarNavigationComponent, CommonModule, HttpClientModule, TableModule,CardModule,ToastModule],
  templateUrl: './service-orders-list.component.html',
  styleUrls: ['./service-orders-list.component.scss']
})
export class ServiceOrdersListComponent implements OnInit {
  serviceOrders: ServiceOrder[] = [];

  constructor(private serviceOrderService: ServiceOrderService) {}

  ngOnInit() {
    this.loadServiceOrders();
  }

  loadServiceOrders() {
    this.serviceOrderService.getAllServiceOrders().subscribe({
      next: (orders) => this.serviceOrders = orders,
      error: (e) => console.error(e)
    });
  }
}
