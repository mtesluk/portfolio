const detailRoute = (routeName: string) => (id: number | null = null) => (id ? `${routeName}${id}` : `${routeName}:id`)

export const config = {
    endpoints: {
        auth: {
            login: '/account/api_token_auth/',
            exists_fb: '/account/users/exist_fb_account/',
            register: '/account/users/'
        },
        blog: {
            authors: '/blogs/authors/',
            countries: '/blogs/countries/',
            base: '/blogs/',
        }
    },
    routes: {
        root: '/',
        blog: {
            dashboard: '/blog',
            authors: '/blog/authors',
            sites: '/blog/sites',
            addNew: '/blog/add',
            detail: detailRoute('/blog/'),
        }
    }
}