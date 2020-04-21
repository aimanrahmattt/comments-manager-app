export class PostResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export class CommentsResponse {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}