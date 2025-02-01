import { useTransition } from "react";

export default function WriteForm({
  onSubmit,
  state,
  initialData,
}: {
  onSubmit: (data: FormData) => void;
  state: { message: string; success: boolean };
  initialData?: { id: string; title: string; content: string; author: string };
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    startTransition(() => {
      onSubmit(formData);
    });
  };

  return (
    <form
      className="w-full pt-[50px] flex flex-wrap gap-4"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="제목"
        type="text"
        name="title"
        defaultValue={initialData?.title}
        className="w-full bg-[#1F2E54] text-white p-4 text-md rounded-[15px]"
      />
      <textarea
        id="content"
        name="content"
        placeholder="내용을 입력해주세요"
        defaultValue={initialData?.content}
        className="text-md resize-none p-4 bg-[#1F2E54] w-full h-[400px] text-white rounded-[15px]"
      />
      <div className="w-full flex justify-between items-center">
        <input
          placeholder="작성자"
          type="text"
          name="author"
          defaultValue={initialData?.author}
          className="bg-[#1F2E54] text-white text-md rounded-[15px] p-4"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`bg-gradient-to-b from-[#C9E5FF]/80 via-[#C9E5FF]/65 to-[#C9E5FF]/80 
            hover:bg-[#C9E5FF] text-[#658CAF] hover:text-[#296399] py-2 px-4 
            rounded-[13px] transition ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isPending ? "작성 중..." : "작성 완료"}
        </button>
      </div>
      <p className="w-full text-center text-white font-bold" aria-live="polite">
        {state?.message}
      </p>
    </form>
  );
}
