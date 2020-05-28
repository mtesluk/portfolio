const proxy = require('http-proxy-middleware');
// var HttpsProxyAgent = require('https-proxy-agent');
// var proxyServer = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.http_proxy;

const baseServerConfig = {
    account: 'http://127.0.0.1:8000',
    blog: 'http://127.0.0.1:5000',
    countries: 'https://restcountries.eu/rest/v2/all?fields=name',
};

const baseServerConfigProd = {
    account: 'https://account-mt.herokuapp.com',
    blog: 'https://portfolio-blog-mt.herokuapp.com',
    countries: 'https://restcountries.eu/rest/v2/all?fields=name',
};

const getBaseUrlConfig = (name) => (process.env.NODE_ENV === 'production' ? baseServerConfig[name] : baseServerConfig[name]);

module.exports = function (app) {
    app.use(
        proxy('/portfolio/account',{
            target: getBaseUrlConfig('account'),
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                '^/portfolio/account': '/api/v2',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
        proxy('/portfolio/blogs',{
            target: getBaseUrlConfig('blog'),
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                '^/portfolio/blogs': '/api/v3/blogs',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
        proxy('/portfolio/countries',{
            target: getBaseUrlConfig('countries'),
            secure: false,
            changeOrigin: true,
            log: true,
            pathRewrite: {
                '^/portfolio/countries': '',
            },
            // agent: new HttpsProxyAgent(proxyServer)
        }),
    );
};
