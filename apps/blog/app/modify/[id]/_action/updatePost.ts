import { updatePost } from "@/app/_actions/post";
interface FormState {
  message: string;
  success: boolean;
}
export async function UpdatePost(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  if (!title.trim() || !content.trim() || !author.trim()) {
    return { message: "빈 칸을 모두 채워주세요 !!", success: false };
  }

  try {
    await updatePost(id, { title, content, author });
    return { message: "작성 성공 !!", success: true };
  } catch (error) {
    console.error("뭐가 문젠데", error);
    return { message: "작성 실패 !!", success: false };
  }
}
