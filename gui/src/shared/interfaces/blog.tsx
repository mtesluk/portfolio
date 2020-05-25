export interface Blog {
    id: number;
    user_id: number;
    title: string;
    country: string | null;
    content: string;
    cooperators: string | null;
    views: number;
    photo_names: string | null;
    add_date?: string;
    update_date?: string;
}

export enum ElementType {
    PARAGRAPH,
    IMAGE,
}

export interface Element {
    value: string | File;
    type: ElementType;
}

