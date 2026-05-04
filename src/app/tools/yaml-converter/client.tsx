"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import { Button } from "@/components/ui/button";
import YAML from "yaml";

export default function YamlConverterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");

  const processData = (value: string, currentMode: "yaml-to-json" | "json-to-yaml") => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      if (currentMode === "yaml-to-json") {
        const parsed = YAML.parse(value);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(value);
        setOutput(YAML.stringify(parsed));
      }
    } catch (e: any) {
      setOutput(`Error: Invalid ${currentMode === "yaml-to-json" ? "YAML" : "JSON"} formatting.\n\n${e.message}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processData(input, mode);
    }, 300);
    return () => clearTimeout(handler);
  }, [input, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json"));
    setInput(output && !output.startsWith("Error:") ? output : "");
  };

  return (
    <ToolLayout
      title={`YAML <-> JSON Converter`}
      description={`Bidirectional converter between YAML and JSON.`}
      toolId="yaml-converter"
    >
      <div className="flex justify-start mb-4">
        <Button variant="outline" onClick={toggleMode}>
          Switch to {mode === "yaml-to-json" ? "JSON to YAML" : "YAML to JSON"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
        <InputPanel
          title={`Input ${mode === "yaml-to-json" ? "YAML" : "JSON"}`}
          value={input}
          onChange={setInput}
          placeholder={`Paste ${mode === "yaml-to-json" ? "YAML" : "JSON"} here...`}
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
          title={`${mode === "yaml-to-json" ? "JSON" : "YAML"} Output`}
          value={output}
          placeholder="Output will appear here..."
        />
      </div>
    </ToolLayout>
  );
}
