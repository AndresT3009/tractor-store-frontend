export const CART_ITEM_ADDED_EVENT = 'tractor-store:cart-item-added';

export interface CartItemAddedDetail {
  sku: string;
  totalItems: number;
}

export type CartItemAddedEvent = CustomEvent<CartItemAddedDetail>;
