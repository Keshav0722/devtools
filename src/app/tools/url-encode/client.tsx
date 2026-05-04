"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import { Button } from "@/components/ui/button";

export default function URLEncodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const processUrl = (value: string, currentMode: "encode" | "decode") => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      if (currentMode === "encode") {
        setOutput(encodeURIComponent(value));
      } else {
        setOutput(decodeURIComponent(value));
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown decoding error";
      setOutput(`Error: Invalid URL Component.\n\n${message}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processUrl(input, mode);
    }, 200);
    return () => clearTimeout(handler);
  }, [input, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    setInput(output);
  };

  return (
    <ToolLayout
      title={`URL ${mode === "encode" ? "Encoder" : "Decoder"}`}
      description={`Instantly ${mode} URL data.`}
      toolId="url-encoder-decoder"
    >
      <div className="flex justify-start mb-4">
        <Button variant="outline" onClick={toggleMode}>
          Switch to {mode === "encode" ? "Decode" : "Encode"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
        <InputPanel
          title={`Input to ${mode}`}
          value={input}
          onChange={setInput}
          placeholder={`Paste your ${mode === "encode" ? "URL" : "Encoded Component"} here...`}
          actionOptions={{
            onClear: () => { setInput(""); setOutput(""); },
          }}
        />
        <OutputPanel
          title={`${mode === "encode" ? "Encoded" : "Decoded"} Output`}
          value={output}
          placeholder="Output will appear here..."
        />
      </div>
    </ToolLayout>
  );
}
