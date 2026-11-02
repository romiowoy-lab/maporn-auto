import { NextRequest, NextResponse } from "next/server";
import { getManagedArticle, updateManagedArticle, deleteManagedArticle } from "@/lib/data/managed-articles";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = getManagedArticle(id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const updated = updateManagedArticle(id, {
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
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ok = deleteManagedArticle(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
