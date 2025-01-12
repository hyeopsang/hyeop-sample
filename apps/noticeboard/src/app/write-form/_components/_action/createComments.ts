import { redirect } from "next/navigation";
import { createComment } from "@/app/lib/api/comments";

export async function CreateComment(state: {message: string}, formData: FormData) {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month  + '-' + day;

    const content = formData.get('content');
    const postId = formData.get('postId');
    if(typeof content !== 'string' || !content.trim()){
        return { message: '글을 적어주세요 !!' }
    }
    try {
        createComment({content, author: '게스트', date: dateString, postId: postId})
        return { message: '작성 완료 !!' }
        redirect('/');
    } catch (error) {
        console.error("뭐가 문젠데", error);
        return { message : '작성 실패 !!' }
        
    }
}