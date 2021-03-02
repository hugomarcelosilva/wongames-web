import { render, screen } from 'utils/test-utils';

import bannerMock from 'components/BannerSlider/mock';
import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Home from '.';

const props = {
  banners: bannerMock,
  newGamesTitle: 'New Games',
  newGames: gamesMock,
  mostPopularHighlight: highlightMock,
  mostPopularGamesTitle: 'Popular Games',
  mostPopularGames: gamesMock,
  upcomingGamesTitle: 'Upcoming Games',
  upcomingGames: gamesMock,
  upcomingHighlight: highlightMock,
  upcomingMoreGames: gamesMock,
  freeGamesTitle: 'Free Games',
  freeGames: gamesMock,
  freeHighlight: highlightMock
};

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>;
    }
  };
});

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider"></div>;
    }
  };
});

describe('<Home />', () => {
  it('should render banner and showcases', () => {
    render(<Home {...props} />);

    expect(screen.getByTestId('Mock Banner Slider')).toBeInTheDocument();
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4);
  });
});
