const HttpsProxyAgent = require('https-proxy-agent');
const { PROXY_HOST, PROXY_PORT } = require('./config');

const proxyAgent = {
  telegram: {
    agent: new HttpsProxyAgent({
      host: PROXY_HOST,
      port: PROXY_PORT,
      keepAlive: true,
      keepAliveMsecs: 10000
    })
  }
};

module.exports = proxyAgent;
