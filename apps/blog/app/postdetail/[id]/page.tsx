import { getPostById, getComment } from '@/app/_actions/post';
import CommentWriteForm from './comments/_components/commentWrite-form';
import CommentContent from './comments/_components/commentContent';
import PostDelete from './_components/postDelete';
import { FormattedDate } from '@/app/_components/formattedDate';
import { Post, Comment } from '@/app/types/index';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetail({ params }: Props) {
  const { id } = await params;
  
  try {
    const PostDetailResponse = await getPostById(id);
    const CommentResponse = await getComment(id);
    const post: Post = PostDetailResponse.data;
    const comments: Comment[] = CommentResponse.data;

    return (
      <div className="w-[800px] flex flex-wrap mx-auto text-left gap-4">
        <div className="w-full pt-8 pb-4 border-b-2 border-[#e5e0d1] flex items-center">                    
          <p className="text-[#e5e0d1] text-2xl font-bold">{post.title}</p>
        </div> 
        <div className='w-full text-[#e5e0d1] flex justify-between px-2'>
          <div className='flex justify-start gap-4'>
            <p>작성자 : {post.author}</p>
            <p>게시일 : {FormattedDate(post.createdAt)}</p>
          </div>
          <PostDelete id={post.id}/>
        </div>     
        <div className='w-full text-[#e5e0d1] px-2'>
          {post.content}
        </div>
        <div className='w-full'>
          <h1 className='text-[#e5e0d1] border-b-2 w-full pt-8 pb-2 font-bold'>댓글</h1>
          <div className='grid grid-cols-1 gap-2 py-6'>
            {comments.map((comment) => (
              <CommentContent key={comment.id} id={comment.id} author={comment.author} content={comment.content} createdAt={comment.createdAt} postId={comment.postId} />
            ))}
          </div>
          <CommentWriteForm postId={id} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('데이터를 불러오지 못했어', error);
    return <div>Error loading data</div>;
  }
}
