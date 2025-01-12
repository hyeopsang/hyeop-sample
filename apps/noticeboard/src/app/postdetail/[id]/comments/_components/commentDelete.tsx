'use client'
import { deleteComment } from "@/app/lib/api/comments";
export default function CommentDelete({ id }: { id: number }) {
    const handleDelete = async () => {
        try {
            const deleteCheck = confirm('해당 댓글을 삭제하시겠습니까?');
            if(deleteCheck === true) {
                await deleteComment(id);
            }
        } catch (error){
            console.error('삭제하지 못했어 !!', error)
        }    
    }
    
    return(
        <button onClick={handleDelete}  className='hover:underline cursor-pointer'>삭제</button>
    )
}
