import Cart, { CartProps } from 'templates/Cart';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';

import cardsMock from 'components/PaymentOptions/mock';
import itemsMock from 'components/CartList/mock';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import { initializeApollo } from 'utils/apollo';

export default function CartPage(props: CartProps) {
  return <Cart {...props} />;
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      cards: cardsMock,
      items: itemsMock,
      recommendedGamesTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      ),
      total: '$ 430,00'
    }
  };
}
