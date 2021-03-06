import http, { Server } from 'http';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import { initDB } from 'lib/utils/mongo';
import { DIApolloPlugin } from 'server/apollo-plugin/di.plugin';
import { graphQlTypeDefs } from 'lib/index';
import { resolvers } from 'resolvers/index';

export async function createServer(): Promise<Server> {
  await initDB();
  const app: Koa = new Koa();

  const apolloServer = new ApolloServer({
    typeDefs: graphQlTypeDefs,
    resolvers,
    mocks: false,
    plugins: [new DIApolloPlugin()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      maxAge: 86400,
      exposeHeaders: ['Authorization'],
    },
  });

  const PORT = 4000;
  return http.createServer(app.callback()).listen(PORT, () => {
    console.log(
      `GraphQL endpoint and playground accessible at http://localhost:${PORT}${apolloServer.graphqlPath}`,
    );
  });
}
