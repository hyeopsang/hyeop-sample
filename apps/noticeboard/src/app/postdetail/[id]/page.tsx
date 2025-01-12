import { getPostById } from '@/app/lib/api/post';
import { getCommentById } from "@/app/lib/api/comments";
import CommentWriteForm from './comments/_components/commentWrite-form';
import { Posts, Comments } from '@/app/types/types';
import CommentContent from './comments/_components/commentContent';
import PostDelete from './_components/postDelete';
interface Props {
  params: Promise<{
    id: number;
  }>;
}

export default async function PostDetail({ params }: Props) {
  const { id } = await params;
  
  try {
    const [postResponse, commentResponse] = await Promise.all([
      getPostById(id),
      getCommentById(id)
    ]);
    
    const post: Posts = postResponse.data;
    const comments: Comments[] = commentResponse.data;

    return (
      <div className="w-[800px] flex flex-wrap mx-auto text-left gap-4">
        <div className="w-full pt-8 pb-4 border-b-2 border-[#e5e0d1] flex items-center">                    
          <p className="text-[#e5e0d1] text-2xl font-bold">{post.title}</p>
        </div> 
        <div className='w-full text-[#e5e0d1] flex justify-between px-2'>
          <div>
            <p>작성자 : {post.author}</p>
            <p>게시일 : {post.date}</p>
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
              <CommentContent key={comment.id} comment={comment} />
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
