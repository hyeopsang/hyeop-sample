import Link from "next/link";

export default function Pagination({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <ul className="flex justify-center gap-2 mt-4">
      <li>
        <Link
          href={`?page=${current - 1}`}
          className={`${
            current === 1 ? "invisible" : "px-4 py-2 rounded bg-gray-300"
          }`}
        >
          이전
        </Link>
      </li>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <li key={page}>
          <Link
            href={`?page=${page}`}
            className={`px-4 py-2 rounded ${
              current === page ? "font-bold text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={`?page=${current + 1}`}
          className={`${
            current === total ? "invisible" : "px-4 py-2 rounded bg-gray-300"
          }`}
        >
          다음
        </Link>
      </li>
    </ul>
  );
}
