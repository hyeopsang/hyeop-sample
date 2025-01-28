export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface DatabaseStructure {
  posts: Post[];
  comments: Comment[];
}

export type CreatePostDTO = Pick<Post, "title" | "content" | "author">;
export type UpdatePostDTO = Partial<CreatePostDTO>;
export type CreateCommentDTO = Pick<Comment, "content" | "author">;

export interface CursorPaginationResponse {
  data: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface OffsetPaginationResponse {
  data: Post[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}
