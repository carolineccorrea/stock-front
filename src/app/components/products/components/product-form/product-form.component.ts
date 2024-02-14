import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService, SharedModule } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEvent } from '../../../../models/enums/products/ProductEvent';
import { GetCategoriesResponse } from '../../../../models/interfaces/categories/responses/GetCategoriesResponse';
import { EventAction } from '../../../../models/interfaces/products/event/EventAction';
import { CreateProductRequest } from '../../../../models/interfaces/products/request/CreateProductRequest';
import { EditProductRequest } from '../../../../models/interfaces/products/request/EditProductRequest';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { ProductsService } from '../../../../services/products/products.service';
import { ProductsDataTransferService } from '../../../../shared/services/products/products-data-transfer.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { PRODUCTS_ROUTES } from '../../products.routing';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { Product, SaleProductsRequest } from '../../../../models/interfaces/products/request/SaleProductsRequest';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ToastModule,
    PanelModule
  ],
  providers: [MessageService],
  styleUrls: [],
})

export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public categoriesDatas: Array<GetCategoriesResponse> = [];
  public selectedCategory: Array<{ name: string; code: string }> = [];
  public productAction!: {
    event: EventAction;
    productDatas: Array<GetAllProductsResponse>;
  };
  public productSelectedDatas!: GetAllProductsResponse;
  public productsDatas: Array<GetAllProductsResponse> = [];
  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });
  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
  });
  public saleProductForm = this.formBuilder.group({
    amount: [0, Validators.required],
    product_id: ['', Validators.required],
  });
  public saleProductSelected!: GetAllProductsResponse;

  public productsToSell: Product[] = [];


  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    public ref: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;

    if (
      this.productAction?.event?.action === this.editProductAction &&
      this.productAction?.productDatas
    ) {
      this.getProductSelectedDatas(this.productAction?.event?.id as string);
    }

    this.productAction?.event?.action === this.saleProductAction &&
      this.getProductDatas();

    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        },
      });
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: Number(this.addProductForm.value.amount),
      };

      this.productsService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto criado com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar produto!',
              life: 2500,
            });
          },
        });
    }

    this.addProductForm.reset();
  }

  handleSubmitEditProduct(): void {
    if (
      this.editProductForm.value &&
      this.editProductForm.valid &&
      this.productAction.event.id
    ) {
      const requestEditProduct: EditProductRequest = {
        name: this.editProductForm.value.name as string,
        price: this.editProductForm.value.price as string,
        description: this.editProductForm.value.description as string,
        product_id: this.productAction?.event?.id,
        amount: this.editProductForm.value.amount as number,
      };

      this.productsService
        .editProduct(requestEditProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto editado com sucesso!',
              life: 2500,
            });
            this.editProductForm.reset();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar produto!',
              life: 2500,
            });
            this.editProductForm.reset();
          },
        });
    }
  }

  //public productsToSell: Product[] = [];

  addProductToSellList(): void {
    if (this.saleProductForm.valid) {
      const productId = this.saleProductForm.value.product_id as string; // Ensure it's a string
      const amount = this.saleProductForm.value.amount as number; // Ensure it's a number
  
      const newProduct: Product = { productId, amount };
      this.productsToSell.push(newProduct);
      this.saleProductForm.reset();
    }
  }
  
  

  handleSubmitSaleProducts(): void {
    if (this.productsToSell.length > 0) {
      // Properly type saleRequest as SaleProductsRequest
      const saleRequest: SaleProductsRequest = { sales: this.productsToSell };
      
      // Call the saleProducts method from your productsService
      this.productsService.saleProducts(saleRequest).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          // Display success message
          this.messageService.add({
            severity: 'success',
            summary: 'Venda Realizada',
            detail: 'Produtos vendidos com sucesso',
            life: 2000
          });
          // Clear the productsToSell list after successful sale
          this.productsToSell = [];
        },
        error: (error) => {
          // Display error message
          // The error parameter can be used to show more specific information
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro na venda dos produtos: ' + error.message,
            life: 2000
          });
        }
      });
    } else {
      // Optionally handle the case where no products are in the list
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Nenhum produto na lista para vender',
        life: 2000
      });
    }
  }
  
  

  getProductSelectedDatas(productId: string): void {
    const allProducts = this.productAction?.productDatas;

    if (allProducts.length > 0) {
      const productFiltered = allProducts.filter(
        (element) => element?.id === productId
      );

      if (productFiltered) {
        this.productSelectedDatas = productFiltered[0];

        this.editProductForm.setValue({
          name: this.productSelectedDatas?.name,
          price: this.productSelectedDatas?.price,
          amount: this.productSelectedDatas?.amount,
          description: this.productSelectedDatas?.description,
        });
      }
    }
  }

  getProductDatas(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
            this.productsDatas &&
              this.productsDtService.setProductsDatas(this.productsDatas);
          }
        },
      });
  }

  getProductName(productId: string): string {
    const product = this.productsDatas.find(p => p.id === productId);
    return product ? product.name : 'Produto não encontrado';
  }

  removeProductFromList(index: number): void {
    this.productsToSell.splice(index, 1);
  }  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}