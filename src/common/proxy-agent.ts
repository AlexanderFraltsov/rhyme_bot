import { HttpsProxyAgent } from 'https-proxy-agent';

import { config } from './config';

export const proxyAgent = {
  telegram: {
    agent: new HttpsProxyAgent({
      host: config.PROXY_HOST,
      port: config.PROXY_PORT,
      keepAlive: true,
      keepAliveMsecs: 10000,
    })
  }
};
