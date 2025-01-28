'use client'
import { useActionState } from "react";
import { CreateComment } from "@/app/postdetail/[id]/comments/_action/createComments";

interface Props {
  postId: string; 
}
export const initialState = {
  message: '',
}

export default function CommentWriteForm({ postId }: Props) {
    const [state, formAction] = useActionState(CreateComment, initialState);

    const handleSubmit = (formData: FormData) => {
        formData.append('postId', postId.toString());
        return formAction(formData);
    };

    return (
        <form action={handleSubmit} className='w-full flex flex-wrap justify-end gap-1'>
            <textarea name="content" className='w-full h-[104px] rounded-[15px] resize-none px-6 py-4' maxLength={150} placeholder='글자 수 150자 이내'/>
            <p className="w-full text-center text-white font-bold" aria-live="polite">{state?.message}</p>
            <button type="submit" className="bg-gradient-to-b from-[#C9E5FF]/80 via-[#C9E5FF]/65 to-[#C9E5FF]/80 hover:bg-[#C9E5FF] text-[#658CAF] hover:text-[#296399] py-2 px-4 rounded-[13px]">댓글 쓰기</button>
        </form>
    )
}
