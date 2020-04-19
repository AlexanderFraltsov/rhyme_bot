const HttpsProxyAgent = require('https-proxy-agent');

const proxyAgent = {
  telegram: {
    agent: new HttpsProxyAgent({
      host: process.env.PROXY_HOST,
      port: process.env.PROXY_PORT,
      keepAlive: true,
      keepAliveMsecs: 10000
    })
  }
};

module.exports = proxyAgent;
