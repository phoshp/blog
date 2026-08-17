import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";

export function NoteList({ notes }: { notes: NoteMeta[] }) {
  return (
    <div className="border-t border-terminal-line">
      {notes.map((note) => (
        <article className="grid gap-3 border-b border-terminal-line py-8 sm:grid-cols-[9rem_1fr] sm:gap-7 sm:py-10" key={note.slug}>
          <div className="flex gap-3 font-mono text-sm leading-5 text-terminal-muted sm:flex-col sm:gap-0">
            <time dateTime={note.date}>{note.date}</time>
            <span className="before:mr-3 before:content-['·'] sm:before:hidden">{note.readingTime}</span>
          </div>
          <div>
            <h2 className="font-serif text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[1.8rem]">
              <Link className="decoration-1 underline-offset-4 hover:text-terminal-blue hover:underline" href={`/${note.slug}`}>{note.title}</Link>
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-7 text-zinc-600">{note.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
