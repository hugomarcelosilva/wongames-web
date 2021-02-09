import { Story, Meta } from '@storybook/react/types-6-0';
import Dropdown, { DropdownProps } from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
  args: {
    title: 'Click here',
    children: 'content'
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story<DropdownProps> = (args) => <Dropdown {...args} />;
