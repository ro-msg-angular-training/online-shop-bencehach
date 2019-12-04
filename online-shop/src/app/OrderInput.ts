export interface OrderInput {
  customer: string;
  products: Cart[];
}
export class Cart {
  productId: number;
  quantity: number;
}
