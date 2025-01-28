import { getPosts } from "@/app/_actions/post";
import Link from "next/link";
import { Post, OffsetPaginationResponse } from "@/app/types";
import { FormattedDate } from "@/app/_components/formattedDate";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default async function PostList() {
    try {
        const response = await getPosts();
        console.log(response.data);
        const posts: Post[] = response.data.data;
        const total: number = response.data.totalPages;
        const current: number = response.data.currentPage;
        const pageNumber = (totalNumber : number, currentNumber : number) => {
                for(let i = 1; i <= totalNumber; i++) {
                    if(currentNumber === i) {
                        return <p className="text-[#296399] font-bold">{i}</p>;
                    } else {
                        return <p>{i}</p>;
                    }
            };
        } 
        if (posts.length === 0) {
            return <p className="w-full py-10 text-center text-white text-xl">게시물이 없어 !!</p>;
        }

        return (
            <div>
                {posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(post => (
                    <Link key={post.id} href={`/postdetail/${post.id}`}>
                        <div className="w-full flex justify-between gap-8 px-6 py-4 bg-gradient-to-r from-[#C9E5FF]/80 via-[#C9E5FF]/65 to-[#C9E5FF]/80 rounded-[15px] hover:bg-[#C9E5FF] cursor-pointer">
                        <p className="font-bold w-3/4 truncate bg-gradient-to-b from-[#296399] via-[#296399]/80 to-[#296399]/50 text-transparent bg-clip-text">
                        {post.title}
                        </p>
                        <div className="w-1/4 flex justify-between gap-4">
                            <p className="truncate text-[#658CAF]">
                                {post.author}
                            </p>
                            <p className="text-[#658CAF] whitespace-nowrap">
                                {FormattedDate(post.createdAt).slice(0, 10)}
                            </p>
                        </div>
                    </div>
                    </Link>
                ))}
                <div>{pageNumber(total, current)}</div>
            </div>
        );
    } catch (error) {
        console.error('게시물을 불러오지 못했어 !!', error);
        return <p>게시물을 불러오지 못했어 !!</p>;
    }
}
