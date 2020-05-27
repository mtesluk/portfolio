const proxy = require('http-proxy-middleware');
// var HttpsProxyAgent = require('https-proxy-agent');
// var proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.http_proxy;
const morgan = require("morgan");


module.exports = function (app) {
    app.use(
        proxy(`/blogs`,{
            target: 'http://127.0.0.1:5000',
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                [`^/blogs`]: '/api/v3/blogs',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
        proxy(`/countries`,{
            target: 'https://restcountries.eu/rest/v2/all?fields=name',
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                [`^/countries`]: '',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
        proxy(`/account`,{
            target: 'http://127.0.0.1:8000',
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                [`^/account`]: '/api/v2',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
    );

    app.use(morgan('combined'));
};
