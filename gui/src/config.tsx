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
    }
}