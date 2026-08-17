import { NoteList } from "@/components/note-list";
import { getNotesMeta } from "@/lib/notes";

export default function HomePage() {
  const notes = getNotesMeta();

  return (
    <div className="pb-24">
      <header className="py-16 sm:py-20">
        <h1 className="mt-7 font-mono text-5xl text-terminal-green font-semibold tracking-[-0.035em] sm:text-6xl">README.md</h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-8 text-zinc-600">
        Notes about crappy ideas sneaking around and this is the dumping station
        </p>
        <p className="mt-8 font-mono text-lg text-terminal-muted">
          <span className="text-terminal-green">$</span> ls -la ~/notes<span className="ml-2 text-zinc-400"># {notes.length} entries</span>
        </p>
      </header>
      <NoteList notes={notes} />
    </div>
  );
}
