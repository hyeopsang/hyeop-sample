'use client'
import { deletePost } from "@/../../app/_actions/posts/post";
import { deleteCommentById } from "@/../../app/_actions/comments/comments";
import { useRouter } from "next/navigation";

export default function PostDelete ({ id } : { id: number }) {
    const router = useRouter();
    const handleDelete = async () => {
            try {
                const deleteCheck = confirm('해당 글을 삭제하시겠습니까?');
                if(deleteCheck === true) {
                    await Promise.all([
                        deletePost(id),
                        deleteCommentById(id)
                    ])
                    
                    router.push('/');
                }
            } catch (error){
                console.error('삭제하지 못했어 !!', error)
            }    
        }
    return (
        <button onClick={handleDelete} className='hover:underline cursor-pointer'>삭제</button>
    )
}