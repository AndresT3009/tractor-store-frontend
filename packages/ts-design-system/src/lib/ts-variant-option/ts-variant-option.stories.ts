import type { Meta, StoryObj } from '@storybook/angular';
import type { Variant } from 'shared-catalog';
import { TsVariantOptionComponent } from './ts-variant-option.component';

const variant: Variant = {
  sku: 'SF-TITAN-COPPER',
  colorName: 'Sunset Copper',
  colorHex: '#C24914',
  imageUrl: '',
};

const meta: Meta<TsVariantOptionComponent> = {
  title: 'ts-design-system/ts-variant-option',
  component: TsVariantOptionComponent,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: { type: 'boolean' } },
    chosen: { action: 'chosen' },
  },
  args: {
    variant,
    selected: false,
  },
};

export default meta;
type Story = StoryObj<TsVariantOptionComponent>;

export const Unselected: Story = {
  args: {
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
