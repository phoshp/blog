import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] flex-col items-start justify-center">
      <p className="font-mono text-[13px] text-red-500">error: 404</p>
      <h1 className="mt-5 font-serif text-5xl font-semibold tracking-tight">page not found.</h1>
      <p className="mt-4 text-lg text-terminal-muted">The requested path does not exist.</p>
      <Link href="/" className="mt-7 font-mono text-sm text-terminal-blue hover:underline">cd ~/ →</Link>
    </section>
  );
}
