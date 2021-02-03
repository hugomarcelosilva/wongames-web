import { Story, Meta } from '@storybook/react/types-6-0';
import { Email } from '@styled-icons/material-outlined';
import TextField, { TextFieldProps } from '.';

export default {
  title: 'Form/TextField',
  component: TextField,
  decorators: [
    (TextField) => (
      <div style={{ maxWidth: 300, padding: 15 }}>
        <TextField />
      </div>
    )
  ],
  args: {
    label: 'E-mail',
    labelFor: 'Email',
    icon: <Email />,
    id: 'Email',
    initialValue: '',
    placeholder: 'john.cage@gmail.com'
  },
  argTypes: {
    onInput: { action: 'changed' },
    icon: { type: '' }
  }
} as Meta;

export const Default: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const withError: Story<TextFieldProps> = (args) => (
  <TextField {...args} />
);

withError.args = {
  error: 'Ops...something is wrong'
};
