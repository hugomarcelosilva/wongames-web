import { render, screen, waitFor } from 'utils/test-utils';
import { Email } from '@styled-icons/material-outlined';
import userEvent from '@testing-library/user-event';

import TextField from '.';

describe('<TextField />', () => {
  it('should render with Label', () => {
    render(<TextField label="Label" name="label" />);

    expect(screen.getByLabelText('Label')).toBeInTheDocument();
  });

  it('should render without Label', () => {
    render(<TextField />);

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<TextField placeholder="hey you" />);

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument();
  });

  it('should render with Icon', () => {
    render(<TextField icon={<Email data-testid="icon" />} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with Icon on the right side', () => {
    render(
      <TextField icon={<Email data-testid="icon" />} iconPosition="right" />
    );

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({ order: 1 });
  });

  it('should changes its value when typing', async () => {
    const onInput = jest.fn();

    render(
      <TextField onInputChange={onInput} label="TextField" name="TextField" />
    );

    const input = screen.getByRole('textbox');
    const text = 'This is my new text';
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).toHaveValue(text);
      expect(onInput).toHaveBeenCalledTimes(text.length);
    });
    expect(onInput).toHaveBeenCalledWith(text);
  });

  it('should does not changes its value when disabled', async () => {
    const onInput = jest.fn();

    render(
      <TextField
        onInputChange={onInput}
        label="TextField"
        name="TextField"
        disabled
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    const text = 'This is my new text';
    userEvent.type(input, text);

    await waitFor(() => {
      expect(input).not.toHaveValue(text);
    });
    expect(onInput).not.toHaveBeenCalled();
  });

  it('should render with error', () => {
    const { container } = render(
      <TextField
        icon={<Email data-testid="icon" />}
        label="TextField"
        error="Error message"
      />
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be accessible with tab', () => {
    render(<TextField label="TextField" name="TextField" />);

    const input = screen.getByLabelText('TextField');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).toHaveFocus();
  });

  it('should not be accessible by tab when disabled', () => {
    render(<TextField label="TextField" name="TextField" disabled />);

    const input = screen.getByLabelText('TextField');
    expect(document.body).toHaveFocus();

    userEvent.tab();
    expect(input).not.toHaveFocus();
  });
});
