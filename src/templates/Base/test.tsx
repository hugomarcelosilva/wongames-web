import { render, screen } from 'utils/test-utils';

import Base from '.';

jest.mock('components/Menu', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Menu" />;
  }
}));

jest.mock('components/Footer', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Footer" />;
  }
}));

describe('<Base />', () => {
  it('should render menu, footer and children', () => {
    render(
      <Base>
        <h1>Heading</h1>
      </Base>
    );

    expect(screen.getByTestId('Mock Menu')).toBeInTheDocument();
    expect(screen.getByTestId('Mock Footer')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /heading/i })
    ).toBeInTheDocument();
  });
});
