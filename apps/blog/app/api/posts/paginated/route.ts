import { NextRequest, NextResponse } from "next/server";

import { readData } from "@/lib/api/json";
import { OffsetPaginationResponse } from "@/app/types";

const DEFAULT_LIMIT = 10;

export async function GET(
  request: NextRequest,
): Promise<
  NextResponse<OffsetPaginationResponse> | NextResponse<{ error: string }>
> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;
    const page = Number(searchParams.get("page")) || 1;

    const data = await readData();
    const offset = (page - 1) * limit;

    return NextResponse.json({
      data: data.posts.slice(offset, offset + limit),
      currentPage: page,
      totalPages: Math.ceil(data.posts.length / limit),
      hasMore: offset + limit < data.posts.length,
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
