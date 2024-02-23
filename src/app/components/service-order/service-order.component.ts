import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { CardModule } from 'primeng/card';

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
    CardModule
  ]
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
    underWarranty: false
  };

  onSubmit() {
    console.log(this.serviceOrder);
  }
}
