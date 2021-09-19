import 'reflect-metadata';

import { Server } from 'http';
import { createServer } from 'server/index';

// HMR
let httpServer: Server;
declare const module: any;

async function main() {
  try {
    httpServer = await createServer();
    if (module.hot) {
      console.log('✅  Server-side HMR Enabled!');
      module.hot.accept(undefined, async () => {
        console.log('🔁  HMR Reloading - changes accepted...');
        httpServer.close().on('close', async () => {
          console.log('🔁  HMR Reloading - on server closed restart again...');
          httpServer = await createServer();
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

main().catch((e) => console.log(e));
