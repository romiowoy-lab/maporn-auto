import type { ArticleBlock } from "@/lib/types";

// Renders a structured article (headings, paragraphs, bullet lists) in reading order — dark theme.
export default function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if ("h" in b) {
          return b.level === 2 ? (
            <h2 key={i} className="pt-6 text-xl font-bold text-white sm:text-2xl">
              {b.h}
            </h2>
          ) : (
            <h3 key={i} className="pt-2 text-lg font-semibold text-white">
              {b.h}
            </h3>
          );
        }
        if ("ul" in b) {
          // short checklist items read well in two columns; explanations stay one per line
          const twoCol = b.ul.every((item) => item.length <= 45);
          return (
            <ul key={i} className={`grid gap-2 rounded-2xl border border-white/10 bg-[#1C1E22] p-5 ${twoCol ? "sm:grid-cols-2 sm:gap-x-6" : ""}`}>
              {b.ul.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-white/75">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-base leading-[1.85] text-white/75">
            {b.p}
          </p>
        );
      })}
    </div>
  );
}
