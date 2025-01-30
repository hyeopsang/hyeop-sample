"use client";
import { useRouter } from "next/navigation";
export default function PostModify({ id }: { id: string }) {
  const router = useRouter();
  const handleModify = async () => {
    router.push(`/modify/${id}`);
  };

  return (
    <button onClick={handleModify} className="hover:underline cursor-pointer">
      수정
    </button>
  );
}
