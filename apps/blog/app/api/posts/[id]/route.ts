import { NextRequest, NextResponse } from "next/server";

import { readData, writeData } from "@/lib/api/json";
import { Post, UpdatePostDTO } from "@/app/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const data = await readData();
    const { id } = await params;
    const post = data.posts.find((p) => p.id === id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body: UpdatePostDTO = await request.json();
    const { id } = await params;
    const data = await readData();
    console.log("id", id);

    const postIndex = data.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const currentPost = data.posts[postIndex] as Post;
    const updatedPost: Post = {
      id: currentPost.id,
      title: body.title ?? currentPost.title,
      content: body.content ?? currentPost.content,
      author: body.author ?? currentPost.author,
      createdAt: currentPost.createdAt,
      updatedAt: new Date().toISOString(),
    };

    data.posts[postIndex] = updatedPost;

    await writeData(data);
    return NextResponse.json(data.posts[postIndex]);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const data = await readData();
    const { id } = await params;

    const postIndex = data.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    data.posts.splice(postIndex, 1);
    // 관련된 댓글도 함께 삭제
    data.comments = data.comments.filter((c) => c.postId !== id);

    await writeData(data);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}
