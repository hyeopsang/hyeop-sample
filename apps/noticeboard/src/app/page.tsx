import Image from "next/image";
import Post from "./postdetail/[id]/_components/post";
import Link from "next/link";

export default function Home() {
  return (
      <div className="w-[800px] h-[70px] flex flex-wrap mx-auto bg-[#4A7DFF]">
        <div className="w-full flex justify-end pt-8 pb-4">
          <button className="text-[#C9E5FF] hover:text-white text-xl">
            <Link href={'/write-form'}>Edit</Link>
          </button>
        </div>
        <div className="w-full grid gap-2 grid-cols-1">
          <Post/>
        </div>
      </div>        
  );
}
