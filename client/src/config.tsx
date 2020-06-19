const baseUrlConfig = {
    account: '/account/',
    blog: '/blogs/',
    countries: '/countries',
};

// https://cors-anywhere.herokuapp.com - workaround for CORS as proxy server
const baseUrlConfigProd = {
    account: `https://account-mt.herokuapp.com/api/v1/`,
    blog: `https://portfolio-blog-mt.herokuapp.com/api/v1/blogs/`,
    countries: `https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all?fields=name`,
};

const getBaseUrlConfig = (name: string) => (process.env.NODE_ENV === 'production' ? baseUrlConfigProd[name] : baseUrlConfig[name]);
const detailRoute = (routeName: string) => (id: number | null = null) => (id ? `${routeName}${id}` : `${routeName}:id`);

export const config = {
    tokenKey: 'token_fsf0324fsd',
    refreshTokenKey: 'token_jhdhfghgfjh',
    endpoints: {
        auth: {
            login: getBaseUrlConfig('account') + 'token_auth/',
            refreshLogin: getBaseUrlConfig('account') + 'token_auth/refresh/',
            me: getBaseUrlConfig('account') + 'users/me/',
            exists_fb: getBaseUrlConfig('account') + 'users/exist_fb_account/',
            register: getBaseUrlConfig('account') + 'users/',
            users: getBaseUrlConfig('account') + 'users/'
        },
        blog: {
            authors: getBaseUrlConfig('blog') + 'authors/',
            countries: getBaseUrlConfig('blog') + 'countries/',
            base: getBaseUrlConfig('blog'),
        },
        countries: {
            base: getBaseUrlConfig('countries'),
        },
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
            updateBlog: detailRoute('/blog/edit/'),
        }
    }
}