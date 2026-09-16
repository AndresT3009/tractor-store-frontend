export const EXPLORE_STORE_SELECTED_EVENT = 'tractor-store:store-selected';

export interface StoreSelectedDetail {
  storeId: string;
}

export type StoreSelectedEvent = CustomEvent<StoreSelectedDetail>;
