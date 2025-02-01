"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WriteForm from "@/app/_components/WriteForm";
import { UpdatePost } from "../_action/updatePost";
import { useActionState } from "react";
import { getPostById } from "@/app/_actions/post";
interface Props {
  params: { id: string };
}

const initialState = {
  message: "",
  success: false,
};

export default function PostModify({ params }: Props) {
  const router = useRouter();
  const [state, formAction] = useActionState(UpdatePost, initialState);
  const [initialData, setInitialData] = useState({
    id: "",
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(params.id);
        const postData = await res.data;
        setInitialData(postData);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };
    fetchPost();
  }, [params.id]);

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <WriteForm onSubmit={formAction} state={state} initialData={initialData} />
  );
}
