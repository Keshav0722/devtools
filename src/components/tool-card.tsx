import Link from "next/link";
import { type ToolItem } from "@/lib/tools";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function ToolCard({ tool }: { tool: ToolItem }) {
  const Icon = tool.icon;

  return (
    <Link href={tool.href} className="group outline-none">
      <Card className="h-full bg-card hover:bg-muted/50 transition-colors border-border/50 hover:border-primary/50 relative overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Icon className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
          </div>
          <CardTitle className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
            {tool.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-1">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
