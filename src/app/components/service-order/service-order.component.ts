import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { CardModule } from 'primeng/card';
import { ServiceOrderService } from '../../services/service-order/service-order.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Customer } from '../../models/interfaces/customer/Customer';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    ToolbarNavigationComponent,
    CardModule,
    ToastModule,
    AutoCompleteModule
  ],
  providers: [MessageService],
})
export class ServiceOrderComponent {
  serviceOrder = {
    equipment: '',
    accessories: '',
    complaint: '',
    entryDate: '',
    status: '',
    description: '',
    serialNumber: '',
    condition: '',
    customerId: '',
    underWarranty: ''
  };

  customers!: Customer[];
  selectedCustomer!: Customer;

  constructor(
    private serviceOrderService: ServiceOrderService, 
    private messageService: MessageService,
    private customerService: CustomerService
  ) {}

  onSubmit() {
    const payload = {
      ...this.serviceOrder,
      underWarranty: this.serviceOrder.underWarranty === 'Sim'
    };

    this.serviceOrderService.createServiceOrder(payload).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ordem de Serviço criada com sucesso!'
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar a Ordem de Serviço.'
        });
      }
    });
  }

  searchCustomer(event: any) {
    this.customerService.searchCustomers(event.query).subscribe(data => {
      this.customers = data;
    });
  }
}
