import Link from "next/link";
import { GithubIcon } from "./icons";

export function Header() {
  return (
    <header className="flex min-h-20 items-center justify-between border-b border-terminal-line font-mono text-sm sm:min-h-24">
      <Link href="/" className="group flex items-center gap-2 font-medium text-xl" aria-label="emre's notes">
        <span className="text-terminal-green">emre@web</span>
        <span className="text-zinc-400">:</span>
        <span className="text-terminal-blue">~/notes</span>
        <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-zinc-800" aria-hidden="true" />
      </Link>
      <nav className="flex items-center gap-4 text-terminal-muted sm:gap-6" aria-label="Main navigation">
        <a className="flex items-center gap-1.5 underline-offset-4 hover:text-terminal-ink hover:underline" href="https://github.com/phoshp" target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <GithubIcon size={32} />
          <span className="hidden sm:inline">github</span>
        </a>
      </nav>
    </header>
  );
}
