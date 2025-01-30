"use client";
import { deletePost } from "@/app/_actions/post";
import { deleteComment } from "@/app/_actions/post";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function PostDelete({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("해당 글을 삭제하시겠습니까?")) {
      try {
        const postDeleteResult = await deletePost(id);
        const commentDeleteResult = await deleteComment(id);
        router.push("/");
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          console.warn("이미 삭제 했어요 !!.");
          router.push("/");
        } else {
          console.error("삭제 중 에러 났어요 !!:", error);
        }
      }
    }
  };

  return (
    <button onClick={handleDelete} className="hover:underline cursor-pointer">
      삭제
    </button>
  );
}
