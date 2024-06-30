import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { ServiceOrderService, ServiceOrder } from '../../services/service-order/service-order.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CustomerService, Customer } from '../../services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { SelectedCustomerCardComponent } from './selected-customer-card/selected-customer-card.component';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    CardModule,
    ToastModule,
    AutoCompleteModule,
    ScrollPanelModule,
    SelectedCustomerCardComponent,
    ToolbarNavigationComponent
  ],
  providers: [MessageService, ServiceOrderService, CustomerService],
})
export class ServiceOrderComponent implements OnInit {
  serviceOrder: ServiceOrder = {
    equipment: '',
    accessories: '',
    complaint: '',
    entryDate: new Date(),
    status: '',
    description: '',
    serialNumber: '',
    condition: '',
    customerId: '',
    brand: '',
    model: '',
    underWarranty: false,
  };

  searchTerm: string = '';
  customers: Customer[] = [];
  selectedCustomer: any;
  filteredCustomers: Customer[] = [];
  previousOrders: any[] = [];
  selectedOrder: any = null;

  constructor(
    private serviceOrderService: ServiceOrderService,
    private messageService: MessageService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    // Inicializações podem ser feitas aqui, se necessário.
  }

  onSubmit(): void {
    console.log('Dados do Formulário de Ordem de Serviço:', this.serviceOrder);

    this.serviceOrderService.createServiceOrder(this.serviceOrder).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ordem de Serviço criada com sucesso!',
        });
        // Limpeza ou redirecionamento pode ser feito aqui
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível criar a ordem de serviço.',
        });
      },
    });
  }

  onSearch(event: any): void {
    this.customerService.searchCustomers(event.query).subscribe(data => {
      this.filteredCustomers = data;
    });
  }

  onOptionSelect(option: Customer): void {
    this.selectedCustomer = option;
    this.serviceOrder.customerId = option.id;
    // Atualizar lógica de habilitação da garantia ou outras ações necessárias após a seleção
  }

  removeSelectedCustomer(): void {
    this.selectedCustomer = null;
    this.serviceOrder.customerId = '';
    this.serviceOrder.underWarranty = false; // Considerar resetar outros campos relacionados, se aplicável
    // Resetar outras propriedades ou campos do formulário conforme necessário
  }

  fetchServiceOrdersByCustomerId(customerId: string): void {
    this.serviceOrderService.getServiceOrdersByCustomerId(customerId).subscribe({
      next: (orders) => {
        this.previousOrders = orders.map(order => ({ label: `OS ${order.id} - ${order.description}`, value: order.id }));
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível buscar as ordens de serviço anteriores.'
        });
      }
    });
  }
}
