export interface PostsProps{
    id: number,
    title: string,
    body: string,
    reaction: number,
    tags: string[];
}

export interface APIresponse {
    posts?: PostsProps[];
}

export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

export interface PageNumberProps {
    pageNumber: number;
}