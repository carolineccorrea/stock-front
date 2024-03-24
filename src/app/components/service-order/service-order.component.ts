import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { CardModule } from 'primeng/card';
import { ServiceOrder, ServiceOrderService } from '../../services/service-order/service-order.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Customer } from '../../models/interfaces/customer/Customer';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CustomerService } from '../../services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollPanelModule } from 'primeng/scrollpanel';

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
    ToolbarNavigationComponent,
    CardModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
    TableModule,
    DialogModule,
    ScrollPanelModule,
    CommonModule
  ],
  providers: [MessageService],
})
export class ServiceOrderComponent {
  serviceOrder: ServiceOrder = {
    equipment: '',
    accessories: '',
    complaint: '',
    entryDate: new Date(), // Ajuste conforme necessário
    status: '',
    description: '',
    serialNumber: '',
    condition: '',
    customerId: '',
    brand: '',
    model: '',
    underWarranty: false
  };

  searchTerm: string = '';
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  previousOrders: ServiceOrder[] = [];
  showOptions: boolean = false;
  isWarrantyYesEnabled: boolean = false;
  selectedOrder!: any;

  selectedCustomerId!: string;
  selectedOrderId!: string;

  constructor(
    private serviceOrderService: ServiceOrderService, 
    private messageService: MessageService,
    private customerService: CustomerService
  ) {}

  onSubmit(): void {
    // Fazendo um console.log do objeto serviceOrder inteiro
    console.log('Dados do Formulário de Ordem de Serviço:', this.serviceOrder);
  
    // Continua com a submissão se tudo estiver correto
    this.serviceOrderService.createServiceOrder(this.serviceOrder).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Ordem de Serviço criada com sucesso!'
        });
        // Limpeza ou redirecionamento pode ser feito aqui
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao enviar',
          detail: 'Não foi possível criar a ordem de serviço.'
        });
      }
    });
  }

  filteredOptions = [] as any

  onSearch(): void {
    // Aqui, 'searchTerm' já contém o valor atualizado do campo de entrada
    if (this.searchTerm) {
      this.customerService.searchCustomers(this.searchTerm).subscribe(data => {
        this.filteredOptions = data;
        this.showOptions = true;
      });
    } else {
      this.filteredOptions = [];
      this.showOptions = false;
    }
  }
  
  toggleDropdown(open?: boolean) {
    this.showOptions = open === undefined ? !this.showOptions : open;
  }

  onOptionSelect(option: Customer): void {
    if (!option.id) {
        this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Cliente selecionado não possui um ID válido.'
        });
        return;
    }

    this.serviceOrder.customerId = option.id;
    this.selectedCustomer = option;
    this.showOptions = false;
    this.isWarrantyYesEnabled = true; // Habilita o botão de garantia "Sim"
}

  
  searchCustomer(event: any) {
    this.customerService.searchCustomers(event.query).subscribe(data => {
      this.customers = data;
    });
  }

  onCustomerSelect(customer: Customer): void {
    // Garanta que o ID do cliente seja uma string. Se por algum motivo o ID for undefined,
    // considere como um erro ou trate de acordo com a lógica específica do seu aplicativo.
    if (!customer.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro na Seleção',
        detail: 'Cliente selecionado não possui um ID válido.'
      });
      return;
    }
  
    this.serviceOrder.customerId = customer.id; // Atualiza o ID do cliente na ordem de serviço
    this.selectedCustomer = customer; // Atualiza o cliente selecionado para exibição ou outras lógicas necessárias
    this.showOptions = false; // Fecha o dropdown de opções
  }

  removeSelectedCustomer(): void {
    this.selectedCustomer = null;
    this.serviceOrder.customerId = ''; // Limpa o ID do cliente na ordem de serviço
    this.serviceOrder.underWarranty = false; // Redefine o estado da garantia para "Não"
    this.previousOrders = []; // Limpa as ordens de serviço anteriores
    this.isWarrantyYesEnabled = false; // Desabilita o botão "Sim" da garantia
    this.selectedOrderId = ''; // Se você estiver mantendo o rastreamento do ID da ordem de serviço selecionada, limpe-o também
}


  onWarrantyYesClick(): void {
    console.log('Warranty "Yes" clicked');
    // Aqui você pode adicionar qualquer lógica que deseja executar quando "Sim" for selecionado
    // Por exemplo, disparar a busca por ordens de serviço se o ID do cliente estiver disponível
    if (this.serviceOrder.customerId) {
      console.log(`Fetching service orders for customer ID: ${this.serviceOrder.customerId}`);
      this.fetchServiceOrdersByCustomerId();
    }
  }

  fetchServiceOrdersByCustomerId(): void {
    this.serviceOrderService.getServiceOrdersByCustomerId(this.serviceOrder.customerId)
      .subscribe({
        next: (orders) => {
          this.previousOrders = orders;
          // Não precisa transformar os dados para o dropdown
        },
        error: (error) => {
          // Tratamento de erro
        }
      });
  }

}

