"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import { toast } from "sonner";

export default function JSONFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const processJSON = (value: string) => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      const parsed = JSON.parse(value);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown parsing error";
      setOutput(`Error: Invalid JSON.\n\n${message}`);
    }
  };

  // Auto run formatting (debounced to avoid typing lag)
  useEffect(() => {
    const handler = setTimeout(() => {
      processJSON(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success("Pasted clipboard content");
    } catch {
      toast.error("Failed to read clipboard");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, beautify, and validate JSON data. Paste your JSON in the input field to instantly see the formatted result."
      toolId="json-formatter"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
        <InputPanel
          title="Input JSON"
          value={input}
          onChange={setInput}
          placeholder='{"example": "paste JSON here"}'
          actionOptions={{
            onPaste: handlePaste,
            onClear: handleClear,
          }}
        />
        <OutputPanel
          title="Formatted Output"
          value={output}
          placeholder="Output will appear here..."
        />
      </div>
    </ToolLayout>
  );
}
