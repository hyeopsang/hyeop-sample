import CommentDelete from "./commentDelete";
import { CommentContentProps, Comments } from "@/app/types/types";



export default function CommentContent ({ comment }: CommentContentProps) {
    return (
        <div className='py-4 px-6 bg-[#C9E5FF] rounded-[15px] text-[#296399] flex flex-wrap justify-between items-center' key={comment.id}>
            <div className='flex w-full justify-between'>
                <p className='font-bold'>{comment.author}</p>
                <CommentDelete id={comment.id}/>
            </div>
            <div className='flex w-full justify-between'>
                <p>{comment.content}</p>
                <p className='text-[#658CAF]'>{comment.date}</p>
            </div>
        </div>
    )
}