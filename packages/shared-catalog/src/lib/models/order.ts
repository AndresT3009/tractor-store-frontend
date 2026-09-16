export interface OrderLine {
  sku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  storeId: string;
  lines: OrderLine[];
  totalPrice: number;
  placedAt: string;
}

export interface PlaceOrderRequest {
  firstName: string;
  lastName: string;
  storeId: string;
}
