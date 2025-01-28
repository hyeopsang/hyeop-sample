import { NextRequest, NextResponse } from "next/server";

import { readData } from "@/lib/api/json";
import { CursorPaginationResponse } from "@/app/types";

const DEFAULT_LIMIT = 10;

export async function GET(
  request: NextRequest,
): Promise<
  NextResponse<CursorPaginationResponse> | NextResponse<{ error: string }>
> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
    const cursor = searchParams.get("cursor") || "";

    const data = await readData();
    const cursorIndex = cursor
      ? data.posts.findIndex((post) => post.id === cursor)
      : -1;

    const startIndex = cursorIndex + 1;
    const posts = data.posts.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: posts,
      nextCursor: posts.length === limit ? posts[posts.length - 1]!.id : null,
      hasMore: startIndex + limit < data.posts.length,
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
