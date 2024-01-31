import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from '../../../../models/enums/products/ProductEvent';
import { DeleteProductAction } from '../../../../models/interfaces/products/event/DeleteProductAction';
import { EventAction } from '../../../../models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ShortenPipe } from '../../../../shared/pipes/shorten/shorten.pipe';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ShortenPipe,
    ToastModule
  ],
    providers: [MessageService],
    styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

  public productSelected!: GetAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({
        product_id,
        productName,
      });
    }
  }
}
