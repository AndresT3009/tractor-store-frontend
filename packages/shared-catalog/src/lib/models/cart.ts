export interface CartLine {
  sku: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
}

export interface Cart {
  items: CartLine[];
  totalQuantity: number;
  totalPrice: number;
}

export interface MiniCart {
  totalQuantity: number;
}

export interface AddCartItemRequest {
  sku: string;
}
