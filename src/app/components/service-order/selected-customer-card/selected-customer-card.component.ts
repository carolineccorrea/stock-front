import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarNavigationComponent } from '../../../shared/toolbar-navigation/toolbar-navigation.component';
import { Customer } from '../../../models/interfaces/customer/Customer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-selected-customer-card',
  standalone: true,
  imports: [ToolbarNavigationComponent, CommonModule, HttpClientModule, TableModule, CardModule, ToastModule, ButtonModule],
  templateUrl: './selected-customer-card.component.html',
  styleUrls: ['./selected-customer-card.component.scss']
})
export class SelectedCustomerCardComponent {
  @Input() selectedCustomer: Customer | null = null;
  @Output() customerRemoved = new EventEmitter<void>();

  removeSelectedCustomer() {
    this.customerRemoved.emit();
  }
}
