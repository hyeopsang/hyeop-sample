# Sample API Documentation

## Base URL

`/api`

## Types

### Post

```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

type CreatePostDTO = Pick<Post, "title" | "content" | "author">;
type UpdatePostDTO = Partial<CreatePostDTO>;
```

### Comment

```typescript
interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
}

type CreateCommentDTO = Pick<Comment, "content" | "author">;
```

## Endpoints

### Posts

#### 모든 게시글 조회

- **설명**: 게시판의 모든 게시글 목록을 조회합니다.
- **URL**: `/posts`
- **Method**: `GET`
- **Response**:
  ```typescript
  Post[]
  ```
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

#### 새 게시글 작성

- **설명**: 새로운 게시글을 작성합니다.
- **URL**: `/posts`
- **Method**: `POST`
- **Body**: `CreatePostDTO`
  ```typescript
  {
    title: string; // 게시글 제목
    content: string; // 게시글 내용
    author: string; // 작성자
  }
  ```
- **Response**: `Post`
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

#### 특정 게시글 조회

- **설명**: ID를 기반으로 특정 게시글의 상세 내용을 조회합니다.
- **URL**: `/posts/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: string (게시글 ID)
- **Response**: `Post`
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

#### 게시글 수정

- **설명**: 특정 게시글의 내용을 수정합니다. 제목, 내용, 작성자 중 원하는 필드만 선택적으로 수정할 수 있습니다.
- **URL**: `/posts/:id`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: string (게시글 ID)
- **Body**: `UpdatePostDTO`
  ```typescript
  {
    title?: string    // 수정할 제목 (선택)
    content?: string  // 수정할 내용 (선택)
    author?: string   // 수정할 작성자 (선택)
  }
  ```
- **Response**: `Post`
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

#### 게시글 삭제

- **설명**: 특정 게시글을 삭제합니다. 해당 게시글의 모든 댓글도 함께 삭제됩니다.
- **URL**: `/posts/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: string (게시글 ID)
- **Response**:
  ```typescript
  {
    message: string;
  }
  ```
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

### Comments

#### 게시글의 댓글 목록 조회

- **설명**: 특정 게시글에 작성된 모든 댓글을 조회합니다.
- **URL**: `/posts/:id/comments`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: string (게시글 ID)
- **Response**: `Comment[]`
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

#### 댓글 작성

- **설명**: 특정 게시글에 새로운 댓글을 작성합니다.
- **URL**: `/posts/:id/comments`
- **Method**: `POST`
- **URL Parameters**:
  - `id`: string (게시글 ID)
- **Body**: `CreateCommentDTO`
  ```typescript
  {
    content: string; // 댓글 내용
    author: string; // 댓글 작성자
  }
  ```
- **Response**: `Comment`
- **Error Response**:
  ```typescript
  {
    error: string;
  }
  ```

## Error Handling

- 모든 엔드포인트는 서버 에러 발생 시 500 상태 코드를 반환합니다
- 유효하지 않은 게시글 ID의 경우 404 상태 코드를 반환합니다
- 에러 응답에는 항상 에러 메시지가 포함됩니다

## Data Storage

- 데이터는 `blog/data/db.json` 파일에 저장됩니다
- 파일 구조:
  ```typescript
  interface DatabaseStructure {
    posts: Post[]; // 게시글 목록
    comments: Comment[]; // 댓글 목록
  }
  ```

## Paginated Posts API

### 페이지네이션 (Offset)

- **URL**: `/api/posts/paginated`
- **Method**: `GET`
- **Query Parameters**:
  ```typescript
  {
    page?: number;    // 페이지 번호 (기본값: 1)
    limit?: number;   // 페이지당 항목 수 (기본값: 10)
  }
  ```
- **Response**:

  ```typescript
  {
    data: Post[];           // 현재 페이지의 게시글 목록
    currentPage: number;    // 현재 페이지 번호
    totalPages: number;     // 전체 페이지 수
    hasMore: boolean;       // 다음 페이지 존재 여부
  }
  ```

- ex) /api/posts/infinite?limit=10&cursor=1735801340250

### 무한 스크롤 (Cursor)

- **URL**: `/api/posts/infinite`
- **Method**: `GET`
- **Query Parameters**:
  ```typescript
  {
    cursor?: string;   // 마지막 게시글 ID (기본값: '')
    limit?: number;    // 조회할 항목 수 (기본값: 10)
  }
  ```
- **Response**:

  ```typescript
  {
    data: Post[];             // 조회된 게시글 목록
    nextCursor: string|null;  // 다음 페이지 커서
    hasMore: boolean;         // 추가 데이터 존재 여부
  }
  ```

- ex) /api/posts/paginated?limit=10&page=2
