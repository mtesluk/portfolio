export interface Profile {
    location?: string;
    facebook_id?: string;
    facebook_name?: string;
}

export interface User {
    username?: string;
    profile?: Profile;
}