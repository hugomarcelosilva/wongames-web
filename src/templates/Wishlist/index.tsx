import Base from 'templates/Base';

import { Container } from 'components/Container';
import { Divider } from 'components/Divider';
import Empty from 'components/Empty';
import GameCard, { GameCardProps } from 'components/GameCard';
import { Grid } from 'components/Grid';
import Heading from 'components/Heading';
import { HighlightProps } from 'components/Highlight';
import Showcase from 'components/Showcase';
import { useWishlist } from 'hooks/use-wishlist';
import Loader from 'components/Loader';

import * as S from './styles';

export type WishlistTemplateProps = {
  recommendedGamesTitle: string;
  recommendedGames: GameCardProps[];
  recommendedHighlight: HighlightProps;
};

const Wishlist = ({
  recommendedGamesTitle,
  recommendedGames,
  recommendedHighlight
}: WishlistTemplateProps) => {
  const { items, loading } = useWishlist();

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          Wishlist
        </Heading>

        {loading ? (
          <S.Loading>
            <Loader />
          </S.Loading>
        ) : items.length >= 1 ? (
          <Grid>
            {items?.map((game, index) => (
              <GameCard key={`wishlist-${index}`} {...game} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wishlist will appear here"
            hasLink
          />
        )}

        <Divider />
      </Container>

      <Showcase
        title={recommendedGamesTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  );
};

export default Wishlist;
