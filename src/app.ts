import { sleep } from 'lib/utils/date-time';
import 'reflect-metadata';
import { createServer } from 'server/index';

declare const module: any;

async function main() {
  // HMR
  if (module.hot) {
    await sleep(1000);
    console.log('🔁  HMR Restarting server...');
    const httpServer = await createServer();
    module.hot.accept();
    module.hot.dispose(async () => {
      await httpServer.close();
      await httpServer.removeAllListeners('upgrade');
      await httpServer.removeAllListeners('request');
      console.log('🔁  HMR Reloading - server dispose...');
    });
  } else {
    await createServer();
  }
}

main().catch((e) => console.log(e));
