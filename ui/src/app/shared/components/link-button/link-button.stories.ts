import type {Meta, StoryObj} from '@storybook/angular';
import {LinkButton} from './link-button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<LinkButton> = {
  title: 'General/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    linkUrl: {
      control: 'text',
    },
    linkText: {
      control: 'text'
    },
    linkExternal: {
      control: 'boolean'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

export default meta;
type Story = StoryObj<LinkButton>;


export const ExternalButton: Story = {
  args: {
    linkUrl: 'https://dhl.com',
    linkText: 'DHL Website',
    linkExternal: true
  }
};
