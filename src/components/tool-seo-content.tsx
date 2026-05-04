import { toolSeoCopy } from "@/lib/tool-seo";
import { type ToolItem } from "@/lib/tools";

export function ToolSeoContent({ tool }: { tool: ToolItem }) {
  const copy = toolSeoCopy[tool.id];

  if (!copy) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border/50 pt-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            About this {tool.name.toLowerCase()} tool
          </h2>
          <p className="text-muted-foreground leading-7">{copy.summary}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Common uses</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {copy.useCases.map((item) => (
                  <li key={item} className="leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Best practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {copy.tips.map((item) => (
                  <li key={item} className="leading-6">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
          {copy.faq.map((item) => (
            <div key={item.question} className="rounded-lg border border-border/60 p-4">
              <h3 className="font-medium">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
