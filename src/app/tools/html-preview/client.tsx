"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel } from "@/components/tool-panels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validatePerformanceLimit } from "@/lib/performance";

const initialHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: system-ui, -apple-system, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f8fafc;
    color: #0f172a;
  }
  .card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    text-align: center;
  }
  button {
    background: #1F6BED;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 20px;
  }
  button:hover {
    background: #1e5dd0;
  }
</style>
</head>
<body>
  <div class="card">
    <h2>Hello Developer 👋</h2>
    <p>Edit this HTML/CSS on the left.</p>
    <button onclick="alert('JavaScript execution is isolated but allowed!')">Click Me</button>
  </div>
</body>
</html>`;

export default function HtmlPreviewClient() {
  const [input, setInput] = useState(initialHtml);
  const [debouncedInput, setDebouncedInput] = useState(initialHtml);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (validatePerformanceLimit(input)) {
        setDebouncedInput(input);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [input]);

  return (
    <ToolLayout
      title="HTML Sandbox & Live Preview"
      description="Write custom HTML, CSS, and basic JavaScript to instantly render in a sterile iframe sandbox."
      toolId="html-preview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[700px]">
        {/* Editor Side */}
        <div className="h-full flex flex-col">
          <InputPanel
            title="HTML Source"
            value={input}
            onChange={setInput}
            placeholder="Type your HTML here..."
            actionOptions={{
              onClear: () => setInput(""),
              onPaste: async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  setInput((prev) => prev + "\n" + text);
                } catch {}
              }
            }}
          />
        </div>

        {/* Preview Side */}
        <div className="h-full flex flex-col pt-1">
          <Card className="h-[calc(100%-8px)] flex flex-col">
            <CardHeader className="py-2.5 px-4 border-b">
              <CardTitle className="text-sm">Isolated Iframe Rendering</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 bg-white">
              <iframe
                title="HTML Preview Server"
                className="w-full h-full border-0 bg-white rounded-b-xl"
                sandbox="allow-scripts"
                srcDoc={debouncedInput}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
