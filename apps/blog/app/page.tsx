import Link from "next/link";
import Post from "@/app/_components/Post";
export default function Page() {
  return (
    <div className="w-[800px] h-[70px] flex flex-wrap mx-auto bg-[#4A7DFF]">
      <div className="w-full flex justify-end pt-8 pb-4">
        <button className="text-[#C9E5FF] hover:text-white text-xl">
          <Link href={"/write"}>Edit</Link>
        </button>
      </div>
      <div className="w-full">
        <Post />
      </div>
    </div>
  );
}
