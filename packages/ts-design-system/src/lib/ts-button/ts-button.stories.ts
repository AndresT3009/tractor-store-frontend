import type { Meta, StoryObj } from '@storybook/angular';
import { TsButtonComponent } from './ts-button.component';

const meta: Meta<TsButtonComponent> = {
  title: 'ts-design-system/ts-button',
  component: TsButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'danger'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    press: { action: 'press' },
  },
  args: {
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<ts-button [variant]="variant" [disabled]="disabled" (press)="press($event)">Add to cart</ts-button>`,
  }),
};

export default meta;
type Story = StoryObj<TsButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};
