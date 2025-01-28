import { NextRequest, NextResponse } from "next/server";

import { readData, writeData } from "@/lib/api/json";
import { Comment, CreateCommentDTO } from "@/app/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const data = await readData();
    const { id } = await params;
    const comments = data.comments.filter((c) => c.postId === id);
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body: CreateCommentDTO = await request.json();
    const data = await readData();
    const { id } = await params;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId: id,
      ...body,
      createdAt: new Date().toISOString(),
    };

    data.comments.unshift(newComment);
    await writeData(data);

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
