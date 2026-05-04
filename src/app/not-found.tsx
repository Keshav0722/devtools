import Link from "next/link";
import { toolsList } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export default function NotFound() {
  const popularTools = toolsList.slice(0, 4);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Page not found</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          The page you requested does not exist. Try one of the most-used developer tools below or return to the
          homepage.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {popularTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
