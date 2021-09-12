import { startServer } from './graphql/server';

const main = async () => {
  const server = await startServer();
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main();
