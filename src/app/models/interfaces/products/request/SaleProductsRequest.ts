export interface SaleProductsRequest {
  sales: Product[];
}

export interface Product {
  productId: string;
  amount: number;
}
