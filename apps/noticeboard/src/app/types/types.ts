
export interface Posts {
    id: number;
    title: string;
    content: string;
    author: string;
    date: number;
}
export interface Comments{
    id: number,
    author: string,
    content: string,
    date: number,
    postId: number
}
export interface CommentContentProps {
    comment: Comments;
}