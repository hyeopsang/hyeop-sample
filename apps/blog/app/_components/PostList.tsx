"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getPosts } from "@/app/_actions/post";
import Link from "next/link";
import { FormattedDate } from "@/app/_components/formattedDate";
import { Post } from "@/app/types";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getPosts(cursor, 15);
      const newPosts = response.data.data;

      setPosts((prev) => {
        const uniquePosts = [...prev, ...newPosts].filter(
          (post, index, self) =>
            index === self.findIndex((p) => p.id === post.id),
        );
        return uniquePosts;
      });
      setCursor(response.data.nextCursor);

      if (!response.data.nextCursor) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("게시물을 불러오지 못했어!", err);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, isLoading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          fetchPosts();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchPosts, hasMore]);

  if (posts.length === 0 && isLoading) {
    return (
      <p className="w-full py-10 text-center text-white text-xl">로딩 중...</p>
    );
  }

  if (posts.length === 0 && !isLoading) {
    return (
      <p className="w-full py-10 text-center text-white text-xl">
        게시물이 없어 !!
      </p>
    );
  }

  return (
    <div className="w-full grid gap-2 grid-cols-1">
      {posts
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((post) => (
          <Link key={post.id} href={`/postdetail/${post.id}`}>
            <div className="w-full flex justify-between gap-8 px-6 py-4 bg-gradient-to-r from-[#C9E5FF]/80 via-[#C9E5FF]/65 to-[#C9E5FF]/80 rounded-[15px] hover:bg-[#C9E5FF] cursor-pointer">
              <p className="font-bold w-3/4 truncate bg-gradient-to-b from-[#296399] via-[#296399]/80 to-[#296399]/50 text-transparent bg-clip-text">
                {post.title}
              </p>
              <div className="w-1/4 flex justify-between gap-4">
                <p className="truncate text-[#658CAF]">{post.author}</p>
                <p className="text-[#658CAF] whitespace-nowrap">
                  <FormattedDate date={post.createdAt} />
                </p>
              </div>
            </div>
          </Link>
        ))}
      <div ref={observerTarget} className="w-full h-10"></div>
      {isLoading && (
        <p className="w-full py-10 text-center text-white text-xl">
          로딩 중...
        </p>
      )}
    </div>
  );
}
