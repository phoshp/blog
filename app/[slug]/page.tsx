import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@/components/icons";
import { MarkdownContent } from "@/components/markdown-content";
import { getNote, getNotesMeta } from "@/lib/notes";

export function generateStaticParams() {
  return getNotesMeta().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  return note ? { title: note.title, description: note.description } : {};
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-3xl pb-24 pt-10 sm:pt-14">
      <Link href="/" className="font-mono text-lg text-terminal-muted hover:text-terminal-blue">cd ..</Link>
      <header className="border-b border-terminal-line pb-10 pt-12 sm:pb-12 sm:pt-16">
        <div className="flex items-center gap-2 font-mono text-sm text-terminal-muted">
          <time dateTime={note.date}>{note.displayDate}</time>
          <span>·</span>
          <span>{note.readingTime}</span>
        </div>
        <h1 className="mt-5 font-serif text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-6xl">{note.title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-600">{note.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-sm text-terminal-green">
          {note.tags.map((tag) => <span key={tag}>#{tag}</span>)}
        </div>
      </header>
      <MarkdownContent source={note.content} />
      <footer className="flex flex-row justify-center content-around gap-8 mt-16 border-t border-terminal-line pt-8 font-mono text-sm text-terminal-muted">
        <p>&quot;thanks for reading&quot;</p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-terminal-blue hover:underline">more posts <ArrowUpRight /></Link>
      </footer>
    </article>
  );
}
