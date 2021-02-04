import { Story, Meta } from '@storybook/react/types-6-0';
import TextContent, { TextContentProps } from '.';

import item from './mock';

export default {
  title: 'TextContent',
  component: TextContent,
  args: { ...item },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story<TextContentProps> = (args) => (
  <TextContent {...args} />
);
