import { getPosts } from "@/app/lib/api/post";
import Link from "next/link";
import { Posts } from "../../../types/types";
export default async function Post() {
    try {
        const response = await getPosts();
        const posts: Posts[] = response.data;

        if (posts.length === 0) {
            return <p className="w-full py-10 text-center text-white text-xl">게시물이 없어 !!</p>;
        }

        return (
            <>
                {posts.map(post => (
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
                                {post.date}
                            </p>
                        </div>
                    </div>
                    </Link>
                ))}
            </>
        );
    } catch (error) {
        console.error('게시물을 불러오지 못했어 !!', error);
        return <p>게시물을 불러오지 못했어 !!</p>;
    }
}
