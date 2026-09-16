export type ProductCategory = 'classic' | 'autonomous';

export interface CategoryTeaser {
  category: string;
  title: string;
  imageUrl: string;
}

export interface HomeData {
  categories: CategoryTeaser[];
}

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CategoryData {
  products: ProductSummary[];
  availableFilters: string[];
}

export interface Variant {
  sku: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  highlights: string[];
  variants: Variant[];
}

export interface Recommendation {
  sku: string;
  productId: string;
  productName: string;
  price: number;
  imageUrl: string;
}

export interface Store {
  id: string;
  name: string;
  addressLine: string;
  city: string;
}
