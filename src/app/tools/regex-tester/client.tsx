"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validatePerformanceLimit } from "@/lib/performance";

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("My email is contact@example.com and secondary@test.org. Invalid email: fake@.com");
  
  const [matches, setMatches] = useState<{ match: string; index: number; group: RegExpMatchArray; colorClass: string }[]>([]);
  const [errorProps, setErrorProps] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!pattern) {
        setMatches([]);
        setErrorProps(null);
        return;
      }
      
      if (!validatePerformanceLimit(testString)) return;

      try {
        const regex = new RegExp(pattern, flags);
        const newMatches = [];
        
        // Colors mapping for UX
        const colors = [
          "bg-blue-500/20 text-blue-700 dark:text-blue-300",
          "bg-green-500/20 text-green-700 dark:text-green-300",
          "bg-purple-500/20 text-purple-700 dark:text-purple-300",
          "bg-orange-500/20 text-orange-700 dark:text-orange-300"
        ];
        
        if (flags.includes('g')) {
          let match;
          let i = 0;
          while ((match = regex.exec(testString)) !== null) {
            newMatches.push({
              match: match[0],
              index: match.index,
              group: match,
              colorClass: colors[i % colors.length]
            });
            i++;
            // Prevent infinite loop if regex matches 0 length string
            if (match.index === regex.lastIndex) {
              regex.lastIndex++;
            }
          }
        } else {
          const match = regex.exec(testString);
          if (match) {
            newMatches.push({
              match: match[0],
              index: match.index,
              group: match,
              colorClass: colors[0]
            });
          }
        }
        
        setMatches(newMatches);
        setErrorProps(null);
      } catch (e: any) {
        setErrorProps(e.message);
        setMatches([]);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [pattern, flags, testString]);

  // Construct highlighted HTML visualization
  const getHighlightedText = () => {
    if (matches.length === 0) return <span>{testString}</span>;
    // For simplicity, just show matched arrays as results below instead of injecting into raw DOM safely to avoid escaping issues
    return (
      <div className="space-y-4">
        {matches.map((m, idx) => (
           <div key={idx} className="flex gap-4 items-center bg-muted/40 p-2 rounded-md border text-sm font-mono">
             <span className="text-muted-foreground w-12 border-r pr-2 shrink-0">#{idx + 1}</span>
             <span className="text-muted-foreground w-20 border-r pr-2 shrink-0">idx: {m.index}</span>
             <span className={`px-2 rounded flex-1 ${m.colorClass}`}>{m.match}</span>
           </div>
        ))}
      </div>
    );
  };

  return (
    <ToolLayout
      title="Regex Tester"
      description="Safely test JavaScript regular expressions and map matches against test cases."
      toolId="regex-tester"
    >
      <div className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Regular Expression</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 relative items-stretch">
              <div className="bg-muted px-4 flex items-center justify-center rounded-l-md border-y border-l text-xl font-mono text-muted-foreground">
                /
              </div>
              <Input 
                className="font-mono text-lg rounded-none border-y h-12 flex-1 focus-visible:ring-0 focus-visible:border-primary"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder="[a-z0-9]+"
              />
              <div className="bg-muted px-4 flex items-center justify-center border-y border-x text-xl font-mono text-muted-foreground">
                /
              </div>
              <Input 
                className="font-mono text-lg rounded-r-md rounded-l-none border-l-0 w-24 h-12 focus-visible:ring-0"
                value={flags}
                onChange={e => setFlags(e.target.value)}
                placeholder="gmi"
              />
            </div>
            {errorProps && <p className="text-sm text-destructive font-medium">{errorProps}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test String</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[150px] font-mono whitespace-pre-wrap text-base"
              value={testString}
              onChange={e => setTestString(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Match Results</CardTitle>
            <div className="text-sm border px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
              {matches.length} Matches Found
            </div>
          </CardHeader>
          <CardContent>
            {matches.length > 0 ? getHighlightedText() : <p className="text-muted-foreground text-sm">No matches found in the defined test string.</p>}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
