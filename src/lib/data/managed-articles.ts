import fs from "fs";
import path from "path";
import type { NewsArticle } from "@/lib/types";

export interface ManagedArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsArticle["category"];
  excerpt: string;
  /** Article body as plain text; paragraphs separated by \n\n */
  content: string;
  image?: string;
  imageAlt?: string;
  author: string;
  publishDate: string;
  tags: string;
  published: boolean;
}

const DATA_FILE = path.join(process.cwd(), "data", "articles.json");

function readFile(): { articles: ManagedArticle[] } {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { articles: [] };
  }
}

function writeFile(data: { articles: ManagedArticle[] }) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function listManagedArticles(): ManagedArticle[] {
  return readFile().articles;
}

export function getManagedArticle(id: string): ManagedArticle | undefined {
  return readFile().articles.find((a) => a.id === id);
}

export function createManagedArticle(data: Omit<ManagedArticle, "id">): ManagedArticle {
  const db = readFile();
  const article: ManagedArticle = { ...data, id: Date.now().toString() };
  db.articles.unshift(article);
  writeFile(db);
  return article;
}

export function updateManagedArticle(id: string, data: Omit<ManagedArticle, "id">): ManagedArticle | null {
  const db = readFile();
  const idx = db.articles.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  db.articles[idx] = { ...data, id };
  writeFile(db);
  return db.articles[idx];
}

export function deleteManagedArticle(id: string): boolean {
  const db = readFile();
  const len = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length === len) return false;
  writeFile(db);
  return true;
}

/** Convert ManagedArticle to NewsArticle shape for use in blog pages */
export function toNewsArticle(a: ManagedArticle): NewsArticle {
  return {
    slug: a.slug,
    title: a.title,
    category: a.category,
    excerpt: a.excerpt,
    content: a.content.split(/\n\n+/).filter(Boolean),
    image: a.image,
    imageAlt: a.imageAlt,
    author: a.author,
    publishDate: a.publishDate,
    tags: a.tags.split(",").map((t) => t.trim()).filter(Boolean),
  };
}
