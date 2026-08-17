import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const notesDirectory = path.join(process.cwd(), "content", "notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  readingTime: string;
  description: string;
  tags: string[];
};

export type Note = NoteMeta & {
  content: string;
};

function requireString(value: unknown, field: string, fileName: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing or invalid "${field}" in ${fileName}`);
  }

  return value;
}

function normalizeDate(value: unknown, fileName: string) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }

  const date = requireString(value, "date", fileName);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`Date must use YYYY-MM-DD format in ${fileName}`);
  }

  return date;
}

function readNote(fileName: string): Note {
  const filePath = path.join(notesDirectory, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const date = normalizeDate(data.date, fileName);
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => requireString(tag, "tags", fileName))
    : [];

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: requireString(data.title, "title", fileName),
    date,
    displayDate: new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`)),
    readingTime: readingTime(content).text,
    description: requireString(data.description, "description", fileName),
    tags,
    content,
  };
}

export function getNotesMeta(): NoteMeta[] {
  if (!fs.existsSync(notesDirectory)) return [];

  return fs
    .readdirSync(notesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readNote)
    .sort((first, second) => second.date.localeCompare(first.date))
    .map((note) => ({
      slug: note.slug,
      title: note.title,
      date: note.date,
      displayDate: note.displayDate,
      readingTime: note.readingTime,
      description: note.description,
      tags: note.tags,
    }));
}

export function getNote(slug: string): Note | undefined {
  const fileName = `${slug}.md`;
  if (!/^[a-z0-9-]+\.md$/.test(fileName)) return undefined;

  const filePath = path.join(notesDirectory, fileName);
  return fs.existsSync(filePath) ? readNote(fileName) : undefined;
}
