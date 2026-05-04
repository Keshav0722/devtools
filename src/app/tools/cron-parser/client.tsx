"use client";

import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import cronstrue from "cronstrue";
import * as cronParser from "cron-parser";

export default function CronParserClient() {
  const [expression, setExpression] = useState("0 12 * * 1-5");
  const result = useMemo(() => {
    if (!expression.trim()) {
      return {
        description: "Waiting for expression...",
        nextRuns: [] as string[],
        error: null as string | null,
      };
    }

    try {
      const humanReadable = cronstrue.toString(expression, { throwExceptionOnParseError: true });
      const parser = cronParser as typeof cronParser & {
        parseExpression: (value: string) => {
          next: () => { toDate: () => Date };
        };
      };
      const interval = parser.parseExpression(expression);
      const runs: string[] = [];
      for (let i = 0; i < 5; i++) {
        runs.push(interval.next().toDate().toLocaleString());
      }
      return {
        description: humanReadable,
        nextRuns: runs,
        error: null,
      };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unable to parse expression";
      return {
        description: "",
        nextRuns: [] as string[],
        error: `Invalid Cron expression. ${message}`,
      };
    }
  }, [expression]);

  const { description, nextRuns, error } = result;

  return (
    <ToolLayout
      title="Cron Parser"
      description="Validate and translate Cron expressions into human-readable text and calculate exactly when they will execute next."
      toolId="cron-parser"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Input */}
        <div className="space-y-6">
          <Card className="h-full">
             <CardHeader>
               <CardTitle className="text-xl">Cron Expression</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="bg-muted p-6 rounded-lg text-center flex flex-col gap-4">
                 <Input 
                   className="text-4xl h-auto py-4 text-center font-mono tracking-widest bg-background border-primary/20 shadow-sm"
                   value={expression}
                   onChange={e => setExpression(e.target.value)}
                 />
                 <div className="flex justify-center gap-4 text-sm font-mono text-muted-foreground mt-2 opacity-50">
                   <span>min</span>
                   <span>hour</span>
                   <span>day</span>
                   <span>month</span>
                   <span>weekday</span>
                 </div>
               </div>
               {error && <p className="text-destructive font-medium text-center">{error}</p>}
               {description && (
                 <div className="mt-8 text-center bg-primary/5 border border-primary/20 p-6 rounded-lg">
                   <h3 className="text-sm font-semibold mb-2 text-muted-foreground uppercase tracking-widest">Translation</h3>
                   <p className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent leading-tight">
                     &quot;{description}&quot;
                   </p>
                 </div>
               )}
             </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-4">
           <Card className="h-full bg-muted/20">
             <CardHeader>
               <CardTitle className="text-lg">Next 5 Occurrences (Local Time)</CardTitle>
             </CardHeader>
             <CardContent>
               {nextRuns.length > 0 ? (
                 <div className="space-y-2">
                   {nextRuns.map((time, idx) => (
                     <div key={idx} className="bg-background border px-4 py-3 rounded-md font-mono text-sm flex gap-4 items-center">
                       <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex justify-center items-center font-bold text-xs shrink-0">
                         {idx + 1}
                       </span>
                       {time}
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="h-32 flex justify-center items-center text-muted-foreground border-2 border-dashed rounded-lg">
                   Enter a valid cron expression to see dates
                 </div>
               )}
             </CardContent>
           </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
