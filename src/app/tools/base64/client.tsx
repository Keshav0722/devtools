"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import { Button } from "@/components/ui/button";

export default function Base64Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const processBase64 = (value: string, currentMode: "encode" | "decode") => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      if (currentMode === "encode") {
        setOutput(btoa(value));
      } else {
        setOutput(atob(value));
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown decoding error";
      setOutput(`Error: Invalid Base64 or Text.\n\n${message}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processBase64(input, mode);
    }, 200);
    return () => clearTimeout(handler);
  }, [input, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    setInput(output);
  };

  return (
    <ToolLayout
      title={`Base64 ${mode === "encode" ? "Encoder" : "Decoder"}`}
      description={`Instantly ${mode} text to Base64 format.`}
      toolId="base64-encode-decode"
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
          placeholder={`Paste your ${mode === "encode" ? "text" : "base64"} here...`}
          actionOptions={{
            onClear: () => { setInput(""); setOutput(""); },
          }}
        />
        <OutputPanel
          title={`${mode === "encode" ? "Base64" : "Decoded Text"} Output`}
          value={output}
          placeholder="Output will appear here..."
        />
      </div>
    </ToolLayout>
  );
}
