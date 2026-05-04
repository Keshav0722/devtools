"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import xmlFormat from "xml-formatter";

export default function XmlFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const processXML = (value: string) => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      // Basic formatting using xml-formatter
      const formattedXml = xmlFormat(value, {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n'
      });
      setOutput(formattedXml);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown formatting error";
      setOutput(`Error: Invalid XML Syntax.\n\n${message}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processXML(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

  return (
    <ToolLayout
      title="XML Formatter & Beautifier"
      description="Format, validate, and elegantly indent arbitrary XML configurations securely in your browser."
      toolId="xml-formatter"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
        <InputPanel
          title="Input Raw XML"
          value={input}
          onChange={setInput}
          placeholder='<?xml version="1.0"?><root><child>value</child></root>'
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
          title="Formatted XML"
          value={output}
          placeholder={`<?xml version="1.0"?>\n<root>\n  <child>value</child>\n</root>`}
        />
      </div>
    </ToolLayout>
  );
}
