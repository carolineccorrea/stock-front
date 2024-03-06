import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../components/products/components/product-form/product-form.component';
import { ProductEvent } from '../../models/enums/products/ProductEvent';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.css'],
  standalone: true,
  imports: [
    MenubarModule,
  ],
})

export class ToolbarNavigationComponent {
  items!: MenuItem[];

  constructor(
    private cookie: CookieService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.initializeMenu();
  }

  initializeMenu(): void {
    this.items = [
      {
        label: 'Ordem de serviço',
        icon: 'pi pi-file-edit',
        routerLink: '/service-order'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/customers'
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        routerLink: '/dashboard'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.handleLogout()
      },
      // Submenu PDV
      {
        label: 'PDV',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Produtos',
            icon: 'pi pi-fw pi-cart-plus',
            command: () => this.router.navigate(['/products'])
          },
          {
            label: 'Categorias',
            icon: 'pi pi-fw pi-ticket',
            command: () => this.router.navigate(['/categories'])
          },
          {
            label: 'Efetuar Venda',
            icon: 'pi pi-fw pi-credit-card',
            command: () => this.handleSaleProduct()
          }
        ]
      }
    ];
  }

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    this.router.navigate(['/home']);
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
