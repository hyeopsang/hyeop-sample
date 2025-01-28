import CommentDelete from "./commentDelete";
import { Comment } from "@/app/types/index";


export default function CommentContent ({ id, author, content, postId, createdAt }: Comment) {
    return (
        <div className='py-4 px-6 bg-[#C9E5FF] rounded-[15px] text-[#296399] flex flex-wrap justify-between items-center' key={id}>
            <div className='flex w-full justify-between'>
                <p className='font-bold'>{author}</p>
                <CommentDelete id={id}/>
            </div>
            <div className='flex w-full justify-between'>
                <p>{content}</p>
            </div>
        </div>
    )
}