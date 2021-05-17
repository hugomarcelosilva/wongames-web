import { GetServerSidePropsContext } from 'next';

import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import Cart, { CartProps } from 'templates/Cart';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import { initializeApollo } from 'utils/apollo';
import protectedRoutes from 'utils/protected-routes';

export default function CartPage(props: CartProps) {
  return <Cart {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  const apolloClient = initializeApollo(null, session);

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  });

  return {
    props: {
      session,
      recommendedGamesTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight
      )
    }
  };
}
