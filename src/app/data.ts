export interface Filter {
    name?: string;
    onlyMy?: boolean;
    sortByName?: boolean;
    sortByDate?: boolean;
}

export interface Attraction {
    id: number,
    title: string,
    creator: string,
    description: string,
    latitude: number,
    longitude: number,
    wiki_info: string,
    wiki_info_link: string,
    images: Image[],
    comments: Comment[],
    created_at: string,
    is_published: 0 | 1
}

export interface Image {
    id: number,
    url: string,
}
export interface Comment {
    id: number,
    creator_name: string,
    creator_id: number,
    title: string,
    text: string
}
