"use client";
import { useRouter } from "next/navigation";
import { CreatePost } from "../_action/createPost";
import { useActionState } from "react";
import { useEffect } from "react";
import WriteForm from "@/app/_components/WriteForm";

const initialState = {
  message: "",
  success: false,
};

export default function Write() {
  const router = useRouter();
  const [state, formAction] = useActionState(CreatePost, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return <WriteForm onSubmit={formAction} state={state} />;
}
