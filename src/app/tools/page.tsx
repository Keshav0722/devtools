import type { Metadata } from "next";
import { toolsList } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export const metadata: Metadata = {
  title: "All Free Online Developer Tools",
  description:
    "Browse all SDRK Dev Tools utilities for JSON, JWT, regex, Base64, URL encoding, hashes, passwords, SQL, XML, YAML, timestamps, UUIDs, and more.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const categories = Array.from(new Set(toolsList.map((tool) => tool.category)));

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16 space-y-14">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">All developer tools</h1>
        <p className="mt-5 text-xl leading-8 text-muted-foreground">
          Browse every free browser-based utility in SDRK Dev Tools. Each tool is focused, fast, and built for
          everyday engineering work.
        </p>
      </header>

      {categories.map((category) => {
        const categoryTools = toolsList.filter((tool) => tool.category === category);
        return (
          <section key={category} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
              <div className="h-px bg-border flex-1 ml-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
