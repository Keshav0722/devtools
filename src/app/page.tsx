import { toolsList } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import { HeroSearch } from "@/components/hero-search";

export default function Home() {
  const categories = Array.from(new Set(toolsList.map(t => t.category)));

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background border-b border-border/40">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]" />
        
        {/* Subtle dynamic background blobs (css-only) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 py-20 lg:py-32 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            The fastest AI-powered dev toolkit
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6">
            Everything you need, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
               all in one place.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            SDRK Dev Tools provides ultra-fast, local-first developer utilities. Format JSON, convert Base64, generate Hashes, and more—instantly.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="container max-w-7xl mx-auto px-4 py-16 lg:py-24 space-y-16">
        {categories.map(category => {
          const categoryTools = toolsList.filter(t => t.category === category);
          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                <div className="h-px bg-border flex-1 ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  );
}
