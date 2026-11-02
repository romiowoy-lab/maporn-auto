import { NextRequest, NextResponse } from "next/server";
import { listManagedArticles, createManagedArticle } from "@/lib/data/managed-articles";

export async function GET() {
  return NextResponse.json(listManagedArticles());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const article = createManagedArticle({
    slug: body.slug,
    title: body.title,
    category: body.category,
    excerpt: body.excerpt,
    content: body.content,
    image: body.image || undefined,
    imageAlt: body.imageAlt || undefined,
    author: body.author || "Maporn Autogroup",
    publishDate: body.publishDate,
    tags: body.tags || "",
    published: body.published ?? true,
  });
  return NextResponse.json(article, { status: 201 });
}
