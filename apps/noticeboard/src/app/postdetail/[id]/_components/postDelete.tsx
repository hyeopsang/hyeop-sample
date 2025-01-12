'use client'
import { deletePost } from "@/../../app/_actions/posts/post";
import { deleteCommentById } from "@/../../app/_actions/comments/comments";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";


export default function PostDelete({ id }: { id: number }) {
    const router = useRouter();
    const handleDelete = async () => {
        if (confirm('해당 글을 삭제하시겠습니까?')) {
            try {
                const postDeleteResult = await deletePost(id);
                const commentDeleteResult = await deleteCommentById(id);
                router.push('/');
            } catch (error) {
                if (error instanceof AxiosError && error.response?.status === 404) {
                    console.warn("이미 삭제 했어요 !!.");
                    router.push('/');
                } else {
                    console.error('삭제 중 에러 났어요 !!:', error);
                }
            }
        }
    }
    

    return (
        <button onClick={handleDelete} className='hover:underline cursor-pointer'>삭제</button>
    )
}
