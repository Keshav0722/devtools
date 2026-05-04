import { toolsList } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import SchemaMarkup from "./schema-markup";
import { ShieldCheck } from "lucide-react";

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  toolId: string;
}

export function ToolLayout({ children, title, description, toolId }: ToolLayoutProps) {
  const currentTool = toolsList.find(t => t.id === toolId);
  const relatedTools = toolsList
    .filter(t => t.id !== toolId && (t.category === currentTool?.category || t.keywords.some(k => currentTool?.keywords.includes(k))))
    .slice(0, 4);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8 flex-1 flex flex-col relative">
      <SchemaMarkup toolName={title} toolDescription={description} toolUrlSlug={toolId} />
      
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 border-border/50">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl tracking-tight font-bold text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-900 shadow-sm shrink-0 font-medium">
             <ShieldCheck className="w-4 h-4 mr-1.5" />
             Processed locally in your browser — no data sent to server
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[400px]">
        {children}
      </div>

      {relatedTools.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border/50">
          <h2 className="text-xl font-semibold mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
