import 'reflect-metadata';
import { createServer } from 'server/index';

declare const module: any;

async function main() {
  const httpServer = await createServer();

  // HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await httpServer.close();
      await httpServer.removeAllListeners('upgrade');
      await httpServer.removeAllListeners('request');
      console.log('🔁  HMR Reloading - server dispose...');
    });
  }
}

main().catch((e) => console.log(e));
