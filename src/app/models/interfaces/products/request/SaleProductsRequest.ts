import { Customer } from "../../customer/Customer";

export interface Product {
  productId: string;
  amount: number;
}


export interface SaleProductsRequest {
  customer: Customer;
  sales: Product[];
}
