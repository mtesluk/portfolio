const proxy = require('http-proxy-middleware');
var HttpsProxyAgent = require('https-proxy-agent');
var proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.http_proxy;

const config = {
    blog: 'http://127.0.0.1:5000/',
    site: 'http://127.0.0.1:5010/',
    account: 'http://127.0.0.1:5020/api/v1',
}

module.exports = function (app) {
    app.use(
        // proxy('/blog', {
        //     target: config.blog,
        //     secure: false,
        //     changeOrigin: true,
        //     log: true,
        //     // pathRewrite: {
        //     //     '^/flights/api': '/',
        //     // },
        //     // agent: new HttpsProxyAgent(proxyServer)
        // }),
        proxy('/account',{
            target: config.account,
            secure: false,
            changeOrigin: true,
            log: true,
            // agent: new HttpsProxyAgent(proxyServer)
        }),
        // proxy('/flights/api/static_fe/',{
        //     target: config.site,
        //     secure: false,
        //     changeOrigin: true,
        //     log: true,
        //     pathRewrite: {
        //         '^/flights/api': '/',
        //     },
        //     // agent: new HttpsProxyAgent(proxyServer)
        // }),
    );
};
