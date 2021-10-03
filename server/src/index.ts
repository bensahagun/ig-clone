import { ApolloServer } from 'apollo-server';
import { getUser } from './utils';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (req) => {
    const user = await getUser(req);

    return { user };
  },
  introspection: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
