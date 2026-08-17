import { MarkdownAsync } from "react-markdown";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const prettyCodeOptions: Options = {
    theme: "github-light",
    keepBackground: false,
};

export async function MarkdownContent({ source }: { source: string }) {
    return (
        <div className="pt-10 font-serif text-[18px] leading-[1.85] text-zinc-800 sm:text-[19px] [&_a]:text-terminal-blue [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-3 [&_blockquote]:my-9 [&_blockquote]:border-l-2 [&_blockquote]:border-terminal-green [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-zinc-600 [&_figure]:my-9 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:text-2xl [&_h3]:font-semibold [&_hr]:my-12 [&_hr]:border-terminal-line [&_li]:my-1.5 [&_ol]:mb-7 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:mb-7 [&_p_code]:rounded [&_p_code]:bg-zinc-100 [&_p_code]:px-1.5 [&_p_code]:py-0.5 [&_p_code]:font-mono [&_p_code]:text-[0.82em] [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-terminal-line [&_pre]:bg-zinc-50 [&_pre]:px-5 [&_pre]:py-4 [&_pre]:font-mono [&_pre]:text-[14px] [&_pre]:leading-6 [&_pre]:shadow-[inset_3px_0_0_#16794b] [&_strong]:font-semibold [&_strong]:text-terminal-ink [&_ul]:mb-7 [&_ul]:list-disc [&_ul]:pl-7">
            <MarkdownAsync
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypePrettyCode, prettyCodeOptions]]}
            >
                {source}
            </MarkdownAsync>
        </div>
    );
}
