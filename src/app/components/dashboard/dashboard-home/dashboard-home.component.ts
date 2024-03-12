import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from '../../../models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from '../../../services/products/products.service';
import { ProductsDataTransferService } from '../../../shared/services/products/products-data-transfer.service';
import { CommonModule } from '@angular/common';
import { ToolbarNavigationComponent } from '../../../shared/toolbar-navigation/toolbar-navigation.component';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { DashboardServiceOrderComponent } from '../dashboard-service-order/dashboard-service-order.component';
import { DashboardProductsComponent } from '../dashboard-products/dashboard-products.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarNavigationComponent,
    CardModule,
    ChartModule,
    HttpClientModule,
    DashboardServiceOrderComponent,
    DashboardProductsComponent
  ],
  providers: [MessageService],
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDtService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
  
  }
}
