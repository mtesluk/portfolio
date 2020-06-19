export interface Blog {
    id: number;
    user_id: number;
    title: string;
    countries: string[];
    content: string;
    cooperators: string | null;
    views: number;
    photo_names: string | null;
    add_date?: string;
    update_date?: string;
}

export interface BlogFormData {
    elements: Element[];
    title: string;
    countries: string[];
}

export enum ElementType {
    PARAGRAPH,
    IMAGE,
}

export interface Element {
    value: string | File;
    type: ElementType;
}

