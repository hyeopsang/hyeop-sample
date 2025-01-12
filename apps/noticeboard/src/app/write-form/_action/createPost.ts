import { redirect } from "next/navigation";
import { createPost } from '@/../../app/_actions/posts/post';

export async function CreatePost(prevState: any, formData: FormData) {
    const today = new Date();

    const title = formData.get('title');
    const content = formData.get('content');
    const author = formData.get('author');

    if(typeof title !== 'string' || !title.trim() || 
       typeof content !== 'string' || !content.trim() || 
       typeof author !== 'string' || !author.trim()){
        return { message: '빈 칸을 모두 채워주세요 !!' }
    }

    try {
        await createPost({title, content, author, date: today});
        return { message: '작성 성공 !!', success: true };
    } catch (error) {
        console.error("뭐가 문젠데", error);
        return { message : '작성 실패 !!', success: false }
    }
}
