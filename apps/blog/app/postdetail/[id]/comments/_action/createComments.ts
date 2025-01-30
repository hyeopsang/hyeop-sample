import { redirect } from "next/navigation";
import { createComment } from "@/app/_actions/post";

export async function CreateComment(
  state: { message: string },
  formData: FormData,
) {
  const today = new Date();
  const content = formData.get("content") as string | null;
  const postId = formData.get("postId") as string | null;
  if (typeof content !== "string" || !content.trim()) {
    return { message: "글을 적어주세요 !!" };
  }
  try {
    if (postId && content) {
      createComment(postId, { content, author: "게스트" });
    } else {
      throw new Error("Invalid postId or content");
    }
    return { message: "작성 완료 !!" };
    redirect("/");
  } catch (error) {
    console.error("뭐가 문젠데", error);
    return { message: "작성 실패 !!" };
  }
}
