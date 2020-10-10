export interface OrderInput {
  userId: string;
  productsList: Cart[];
  deliveryLocation: DeliveryLocations
}

export class Cart {
  productId: number;
  quantity: number;
}

export class DeliveryLocations {
  addressCountry: string;
  addressCity: string;
  addressStreet: string;
}
