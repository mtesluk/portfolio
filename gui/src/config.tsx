const baseUrlConfig = {
    account: '/account',
    blog: '',
};

const productionUrl = 'http://172.105.93.9';
const baseUrlConfigProd = {
    account: `${productionUrl}/api/v2`,
    blog: `${productionUrl}/api/v3`,
};

const getBaseUrlConfig = (name: string) => (process.env.NODE_ENV === 'production' ? baseUrlConfigProd[name] : baseUrlConfig[name]);
const detailRoute = (routeName: string) => (id: number | null = null) => (id ? `${routeName}${id}` : `${routeName}:id`);

export const config = {
    tokenKey: 'token_fsf0324fsd',
    endpoints: {
        auth: {
            login: getBaseUrlConfig('account') + '/api_token_auth/',
            me: getBaseUrlConfig('account') + '/users/me/',
            exists_fb: getBaseUrlConfig('account') + '/users/exist_fb_account/',
            register: getBaseUrlConfig('account') + '/users/',
            users: getBaseUrlConfig('account') + '/users/'
        },
        blog: {
            authors: getBaseUrlConfig('blog') + '/blogs/authors/',
            countries: getBaseUrlConfig('blog') + '/blogs/countries/',
            base: getBaseUrlConfig('blog') + '/blogs/',
        },
        countries: {
            base: '/countries',
        }
    },
    routes: {
        root: '/',
        blog: {
            dashboard: '/blog',
            authors: '/blog/authors',
            sites: '/blog/sites',
            addNew: '/blog/add',
            profile: '/blog/profile',
            detail: detailRoute('/blog/'),
        }
    }
}