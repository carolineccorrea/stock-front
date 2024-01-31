import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../components/products/components/product-form/product-form.component';
import { ProductEvent } from '../../models/enums/products/ProductEvent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  standalone: true,
  imports: [CommonModule,ButtonModule,ToolbarModule,RouterModule],
  styleUrls: [],
})
export class ToolbarNavigationComponent {
  constructor(
    private cookie: CookieService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

  handleSaleProduct(): void {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

    this.dialogService.open(ProductFormComponent, {
      header: saleProductAction,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: saleProductAction },
      },
    });
  }
}
