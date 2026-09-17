import type {
  Cart,
  CartLine,
  CategoryData,
  HomeData,
  Order,
  ProductDetail,
  ProductSummary,
  Recommendation,
  Stock,
  Store,
} from 'shared-catalog';

export const mockProducts: Record<string, ProductDetail> = {
  'smartfarm-titan': {
    id: 'smartfarm-titan',
    name: 'SmartFarm Titan',
    description: 'Autonomous tractor with GPS-guided rows and a 12-hour battery.',
    category: 'autonomous',
    price: 4000,
    highlights: ['GPS auto-steer', '12h battery', 'Companion app'],
    variants: [
      { sku: 'SF-TITAN-COPPER', colorName: 'Sunset Copper', colorHex: '#C24914', imageUrl: '' },
      { sku: 'SF-TITAN-SAPPHIRE', colorName: 'Cosmic Sapphire', colorHex: '#1B3F91', imageUrl: '' },
    ],
  },
  'rapid-plow': {
    id: 'rapid-plow',
    name: 'Rapid Plow',
    description: 'Classic diesel tractor built for heavy-duty plowing.',
    category: 'classic',
    price: 1200,
    highlights: ['Diesel engine', '4x4 drive'],
    variants: [{ sku: 'RAPID-BLUE', colorName: 'Field Blue', colorHex: '#1E5AA8', imageUrl: '' }],
  },
};

export const mockProductSummaries: Record<string, ProductSummary[]> = {
  all: Object.values(mockProducts).map(toSummary),
  autonomous: Object.values(mockProducts)
    .filter((p) => p.category === 'autonomous')
    .map(toSummary),
  classic: Object.values(mockProducts)
    .filter((p) => p.category === 'classic')
    .map(toSummary),
};

function toSummary(product: ProductDetail): ProductSummary {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: '',
    category: product.category,
  };
}

export const mockHome: HomeData = {
  categories: [
    { category: 'classic', title: 'Classic Tractors', imageUrl: '' },
    { category: 'autonomous', title: 'Autonomous Tractors', imageUrl: '' },
  ],
};

export function mockCategory(filter: string): CategoryData {
  return {
    products: mockProductSummaries[filter] ?? mockProductSummaries['all'],
    availableFilters: ['all', 'classic', 'autonomous'],
  };
}

export const mockStores: Store[] = [
  {
    id: 'store-denver',
    name: 'Denver Yard',
    addressLine: '100 Prairie Ave',
    city: 'Denver',
    imageUrl: '/images/stores/aurora-flagship.jpg',
  },
  {
    id: 'store-austin',
    name: 'Austin Depot',
    addressLine: '55 Ranch Rd',
    city: 'Austin',
    imageUrl: '/images/stores/big-micro-machines.jpg',
  },
];

export function mockRecommendations(skus: string[]): Recommendation[] {
  return Object.values(mockProducts)
    .flatMap((product) => product.variants.map((variant) => ({ product, variant })))
    .filter(({ variant }) => !skus.includes(variant.sku))
    .slice(0, 4)
    .map(({ product, variant }) => ({
      sku: variant.sku,
      productId: product.id,
      productName: product.name,
      price: product.price,
      imageUrl: '',
    }));
}

export function mockStock(sku: string): Stock {
  const quantityAvailable = sku.endsWith('SAPPHIRE') ? 0 : 6;
  return { sku, quantityAvailable, available: quantityAvailable > 0 };
}

const skuToLine = (sku: string): CartLine | null => {
  for (const product of Object.values(mockProducts)) {
    const variant = product.variants.find((v) => v.sku === sku);
    if (variant) {
      return {
        sku,
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: 1,
        subtotal: product.price,
        imageUrl: variant.imageUrl,
      };
    }
  }
  return null;
};

export function createCartState() {
  let lines: CartLine[] = [];

  const toCart = (): Cart => ({
    items: lines,
    totalQuantity: lines.reduce((sum, line) => sum + line.quantity, 0),
    totalPrice: lines.reduce((sum, line) => sum + line.subtotal, 0),
  });

  return {
    get: (): Cart => toCart(),
    addItem: (sku: string): Cart => {
      const existing = lines.find((line) => line.sku === sku);
      if (existing) {
        existing.quantity += 1;
        existing.subtotal = existing.quantity * existing.unitPrice;
      } else {
        const line = skuToLine(sku);
        if (line) {
          lines = [...lines, line];
        }
      }
      return toCart();
    },
    removeItem: (sku: string): Cart => {
      lines = lines.filter((line) => line.sku !== sku);
      return toCart();
    },
    clear: (): void => {
      lines = [];
    },
  };
}

let orderSequence = 0;

export function createOrder(input: {
  firstName: string;
  lastName: string;
  storeId: string;
  cart: Cart;
}): Order {
  orderSequence += 1;
  return {
    id: `mock-order-${orderSequence}`,
    firstName: input.firstName,
    lastName: input.lastName,
    storeId: input.storeId,
    lines: input.cart.items.map((item) => ({
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    })),
    totalPrice: input.cart.totalPrice,
    placedAt: new Date().toISOString(),
  };
}
