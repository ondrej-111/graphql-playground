import express, {Express} from 'express';
import {ApolloServer} from 'apollo-server-express';
import resolvers from './resolvers';
import {Server} from 'http';
import typeDefs from './schema';

async function mid1(context: any) {
    // console.log('Mid reached wiht context', context);
    return {
        test: 1
    }
}

// HMR
let httpServer: Server;
declare const module: any;

async function createServer(app: Express, graphQLPath: string): Promise<Server> {
    const PORT = 4000;
    return app.listen(PORT, () => {
        console.log(
            `GraphQL endpoint and playground accessible at http://localhost:${PORT}${graphQLPath}`,
        );
    });
}

async function main() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        mocks: false,
        context: mid1
    });

    const app = express();
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: true,
    });

    try {
        httpServer = await createServer(app, apolloServer.graphqlPath);
        if (module.hot) {
            console.log('✅  Server-side HMR Enabled!');
            module.hot.accept(undefined, async () => {
                console.log('🔁  HMR Reloading - changes accepted...');
                httpServer.close().on('close', async () => {
                    console.log('🔁  HMR Reloading - on server closed restart again...');
                    httpServer = await createServer(app, apolloServer.graphqlPath);
                });
            });

            module.hot.dispose(() => {
                console.log('🔁  HMR Reloading - server dispose...');
                httpServer.close();
            });
        }
    } catch (e) {
        console.error((e as Error).message);
    } finally {
        // DO some stuff on server crash
    }
}

main().catch(e => console.log(e));
