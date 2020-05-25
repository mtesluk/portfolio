export interface Profile {
    location?: string;
    facebook_id?: string;
    facebook_name?: string;
}

export interface User {
    id? :number;
    username?: string;
    first_name?: string;
    last_name?: string;
    profile?: Profile;
    is_superuser?: boolean;
}

export enum RegisterFormType {
    NONE,
    FRAGMENTARY,
    FULL,
}