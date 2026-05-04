"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel } from "@/components/tool-panels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const initialMarkdown = `# Welcome to SDRK Markdown Editor

This is a live editor. You can type **Markdown** on the left and see it instantly rendered here!

## Features Supported:
- Text formatting: *italics*, **bold**, \`code\`, ~~strikethrough~~
- [Links](https://example.com)
- Blockquotes
  > "The speed of light is roughly 300,000 km/s."

### Tables (GitHub Flavored Markdown)

| Feature | Status |
| ----------- | ----------- |
| Live Render | Active |
| Fast Speed | Very Active |

### Code Blocks
\`\`\`javascript
function greet() {
  console.log("Hello Developer!");
}
\`\`\`
`;

export default function MarkdownEditorClient() {
  const [input, setInput] = useState(initialMarkdown);

  return (
    <ToolLayout
      title="Markdown Editor & Preview"
      description="Write markdown text and preview the rendered output in real time. Supports GitHub Flavored Markdown (tables, strikethrough)."
      toolId="markdown-editor"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[700px]">
        {/* Editor Side */}
        <div className="h-full flex flex-col">
          <InputPanel
            title="Markdown Source"
            value={input}
            onChange={setInput}
            placeholder="Type your markdown here..."
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
              <CardTitle className="text-sm">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 bg-muted/20">
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {input}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
