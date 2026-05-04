"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validatePerformanceLimit } from "@/lib/performance";
import { diffWordsWithSpace, Change } from "diff";

export default function DiffCheckerClient() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diffResult, setDiffResult] = useState<Change[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (original || modified) {
        if (!validatePerformanceLimit(original, "Original text too large")) return;
        if (!validatePerformanceLimit(modified, "Modified text too large")) return;
        
        try {
          const differences = diffWordsWithSpace(original, modified);
          setDiffResult(differences);
        } catch (e) {
          console.error("Diff calculation failed", e);
        }
      } else {
        setDiffResult([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [original, modified]);

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two blocks of text side-by-side to highlight additions and deletions."
      toolId="diff-checker"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Original Text</Label>
          <Textarea
            className="h-64 resize-none font-mono text-sm bg-background/50 border-border/50 focus-visible:ring-primary/50"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste your original text here..."
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Modified Text</Label>
          <Textarea
            className="h-64 resize-none font-mono text-sm bg-background/50 border-border/50 focus-visible:ring-primary/50"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste your modified text here..."
          />
        </div>
      </div>

      <Card className="min-h-[200px] border-border/50">
        <CardHeader className="py-3 border-b bg-muted/20">
          <CardTitle className="text-sm flex gap-4">
            <span>Result Mapping:</span>
            <span className="text-destructive bg-destructive/10 px-1 rounded">- Deletions</span>
            <span className="text-green-500 bg-green-500/10 px-1 rounded">+ Additions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="whitespace-pre-wrap font-mono text-sm break-words leading-relaxed bg-muted/30 p-4 rounded-md">
            {diffResult.length === 0 && (
              <span className="text-muted-foreground italic">Differences will be mapped here...</span>
            )}
            {diffResult.map((part, index) => {
              const color = part.added
                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                : part.removed
                ? "bg-destructive/20 text-destructive line-through"
                : "text-foreground";
              return (
                <span key={index} className={color}>
                  {part.value}
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
