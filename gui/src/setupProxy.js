const proxy = require('http-proxy-middleware');
var HttpsProxyAgent = require('https-proxy-agent');
var proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.http_proxy;

const config = {
    account: 'http://127.0.0.1:8000',
    blog: 'http://127.0.0.1:5000',
}

module.exports = function (app) {
    app.use(
        proxy('/blogs',{
            target: config.blog,
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                '^/blogs': '/api/v1/blogs',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
        proxy('/account',{
            target: config.account,
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                '^/account': '/api/v1',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
    );
};
