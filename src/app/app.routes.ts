import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/page/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent),
    canActivate: [AuthGuard] // Supondo que você tenha um AuthGuard
  },
  {
    path: 'products',
    loadComponent: () => import('./components/products/page/products-home/products-home.component').then(m => m.ProductsHomeComponent),
    canActivate: [AuthGuard] // Supondo que você tenha um AuthGuard
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/page/categories-home/categories-home.component').then(m => m.CategoriesHomeComponent),
    canActivate: [AuthGuard] // Supondo que você tenha um AuthGuard
  },
  {
    path: 'service-order',
    loadComponent: () => import('./components/service-order/service-order.component').then(m => m.ServiceOrderComponent),
    canActivate: [AuthGuard] // Supondo que você tenha um AuthGuard
  },
  {
    path: 'customers',
    loadComponent: () => import('./components/customers/customers.component').then(m => m.CustomersComponent),
    canActivate: [AuthGuard] // Supondo que você tenha um AuthGuard
  }
];
