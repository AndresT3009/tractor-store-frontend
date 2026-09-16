import type { Meta, StoryObj } from '@storybook/angular';
import type { ProductSummary } from 'shared-catalog';
import { TsProductCardComponent } from './ts-product-card.component';

const placeholderImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#eef6ee"/></svg>'
  );

const product: ProductSummary = {
  id: 'smartfarm-titan',
  name: 'SmartFarm Titan',
  price: 4000,
  imageUrl: placeholderImage,
  category: 'autonomous',
};

const meta: Meta<TsProductCardComponent> = {
  title: 'ts-design-system/ts-product-card',
  component: TsProductCardComponent,
  tags: ['autodocs'],
  argTypes: {
    showPrice: { control: { type: 'boolean' } },
    chosen: { action: 'chosen' },
  },
  args: {
    product,
    showPrice: true,
  },
};

export default meta;
type Story = StoryObj<TsProductCardComponent>;

export const WithPrice: Story = {
  args: {
    showPrice: true,
  },
};

export const WithoutPrice: Story = {
  args: {
    showPrice: false,
  },
};
