"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import { format } from "sql-formatter";

export default function SqlFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const processSQL = (value: string) => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      // Basic formatting using sql-formatter's default dialect
      const formattedSql = format(value, {
        language: 'sql',
        tabWidth: 2,
        keywordCase: 'upper',
        logicalOperatorNewline: 'before'
      });
      setOutput(formattedSql);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown formatting error";
      setOutput(`Error: Invalid SQL Syntax.\n\n${message}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processSQL(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

  return (
    <ToolLayout
      title="SQL Formatter & Beautifier"
      description="Format and indent messy SQL queries into readable code instantly."
      toolId="sql-formatter"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
        <InputPanel
          title="Input SQL Query"
          value={input}
          onChange={setInput}
          placeholder="SELECT * FROM table WHERE id = 1"
          actionOptions={{
            onClear: () => { setInput(""); setOutput(""); },
            onPaste: async () => {
              try {
                const text = await navigator.clipboard.readText();
                setInput(text);
              } catch {}
            }
          }}
        />
        <OutputPanel
          title="Formatted SQL"
          value={output}
          placeholder="SELECT\n  *\nFROM\n  table..."
        />
      </div>
    </ToolLayout>
  );
}
