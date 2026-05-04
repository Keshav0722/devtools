import Link from "next/link";
import type { Metadata } from "next";
import { toolsList } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import { HeroSearch } from "@/components/hero-search";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const popularToolIds = [
  "json-formatter",
  "jwt-decoder",
  "regex-tester",
  "base64-encode-decode",
  "sql-formatter",
  "password-generator",
];

export default function Home() {
  const categories = Array.from(new Set(toolsList.map((tool) => tool.category)));
  const popularTools = popularToolIds
    .map((id) => toolsList.find((tool) => tool.id === id))
    .filter(Boolean);

  return (
    <div className="flex flex-col flex-1">
      <section className="relative overflow-hidden bg-background border-b border-border/40">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]" />

        <div className="container max-w-7xl mx-auto px-4 py-16 lg:py-24 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            {toolsList.length}+ free browser-based developer tools
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
            Free online developer tools for JSON, JWT, Regex, Base64, SQL, and more
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-10 leading-8">
            SDRK Dev Tools gives developers fast, private utilities for daily debugging and conversion work.
            Format JSON, decode JWTs, test regular expressions, generate hashes, convert timestamps, and keep
            sensitive input on your own device.
          </p>

          <HeroSearch />

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            {popularTools.map((tool) =>
              tool ? (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="rounded-full border border-border bg-background px-4 py-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {tool.name}
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="container max-w-7xl mx-auto px-4 py-12 grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold">Local-first privacy</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Most tools run entirely in the browser, which keeps code, tokens, payloads, and generated values off
              third-party servers.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Dedicated tool pages</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Each utility has its own focused page with clear titles, crawlable content, related tools, and clean
              internal links.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Built for speed</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The app uses static rendering, optimized fonts, and lightweight interactions so common tasks feel
              instant on desktop and mobile.
            </p>
          </div>
        </div>
      </section>

      <section id="tools" className="container max-w-7xl mx-auto px-4 py-16 lg:py-24 space-y-16">
        {categories.map((category) => {
          const categoryTools = toolsList.filter((tool) => tool.category === category);
          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                <div className="h-px bg-border flex-1 ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
