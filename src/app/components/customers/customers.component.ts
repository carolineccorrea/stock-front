import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    ToolbarNavigationComponent,
    CardModule,
    ToastModule,
    PanelModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {}

  public customerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: [''],
    cpf: [''],
    cnpj: ['']
  });

}
