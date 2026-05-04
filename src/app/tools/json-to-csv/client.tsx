"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { InputPanel, OutputPanel } from "@/components/tool-panels";
import { validatePerformanceLimit } from "@/lib/performance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function JsonToCsvClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const processConversion = (value: string) => {
    if (!value.trim()) {
      setOutput("");
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    try {
      let data = JSON.parse(value);
      
      // Force array for uniform processing
      if (!Array.isArray(data)) {
        data = [data];
      }
      
      if (data.length === 0) {
        setOutput("");
        return;
      }
      
      // Extract headers from the first object
      const headers = Object.keys(data[0]);
      
      const csvRows = [];
      csvRows.push(headers.join(","));
      
      for (const row of data) {
        const values = headers.map(header => {
          let val = row[header] === null || row[header] === undefined ? "" : String(row[header]);
          // Escape quotes
          val = val.replace(/"/g, '""');
          // Wrap in quotes if it contains comma, newline or quotes
          if (val.search(/("|,|\n)/g) >= 0) {
            val = `"${val}"`;
          }
          return val;
        });
        csvRows.push(values.join(","));
      }
      
      setOutput(csvRows.join("\n"));
    } catch (e: any) {
      setOutput(`Error: Invalid JSON.\n\n${e.message}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processConversion(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

  const handleDownload = () => {
    if (!output || output.startsWith("Error")) return;
    const blob = new Blob([output], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("CSV file downloaded!");
  };

  return (
    <ToolLayout
      title="JSON to CSV Converter"
      description="Convert JSON arrays or objects into standard, downloadable CSV formatted text instantly."
      toolId="json-to-csv"
    >
      <div className="flex justify-end mb-4 gap-2">
        <Button 
          variant="secondary" 
          onClick={handleDownload} 
          disabled={!output || output.startsWith("Error")}
          className="gap-2"
        >
          <Download className="w-4 h-4" /> Download CSV File
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[500px]">
        <InputPanel
          title="Input JSON Array"
          value={input}
          onChange={setInput}
          placeholder='[{"id": 1, "name": "Jane", "role": "admin"}]'
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
          title="CSV Output"
          value={output}
          placeholder="id,name,role..."
        />
      </div>
    </ToolLayout>
  );
}
