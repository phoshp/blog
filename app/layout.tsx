import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "emre's notes", template: "%s — emre's notes" },
  description: "Notes about code",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-serif text-terminal-ink antialiased selection:bg-emerald-100 selection:text-emerald-950">
        <div className="mx-auto min-h-screen w-full max-w-4xl px-5 sm:px-8">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
