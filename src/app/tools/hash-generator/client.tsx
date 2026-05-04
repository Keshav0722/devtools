"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { validatePerformanceLimit } from "@/lib/performance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Plus, Trash2, CheckCircle2 } from "lucide-react";
import CryptoJS from "crypto-js";

interface HashResult {
  name: string;
  value: string;
  copied: boolean;
}

export default function HashGeneratorClient() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult[]>([
    { name: "MD5", value: "", copied: false },
    { name: "SHA-1", value: "", copied: false },
    { name: "SHA-256", value: "", copied: false },
    { name: "SHA-512", value: "", copied: false },
  ]);

  const processHashes = (value: string) => {
    if (!value) {
      setHashes(hashes.map(h => ({ ...h, value: "" })));
      return;
    }
    
    if (!validatePerformanceLimit(value)) return;

    setHashes([
      { name: "MD5", value: CryptoJS.MD5(value).toString(), copied: false },
      { name: "SHA-1", value: CryptoJS.SHA1(value).toString(), copied: false },
      { name: "SHA-256", value: CryptoJS.SHA256(value).toString(), copied: false },
      { name: "SHA-512", value: CryptoJS.SHA512(value).toString(), copied: false },
    ]);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      processHashes(input);
    }, 150);
    return () => clearTimeout(handler);
  }, [input]);

  const handleCopy = (index: number) => {
    const hash = hashes[index];
    if (!hash.value) return;
    navigator.clipboard.writeText(hash.value);
    
    const newHashes = [...hashes];
    newHashes[index].copied = true;
    setHashes(newHashes);
    toast.success(`${hash.name} copied!`);
    
    setTimeout(() => {
      const resetHashes = [...newHashes];
      resetHashes[index].copied = false;
      setHashes(resetHashes);
    }, 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast.success("Pasted clipboard content");
    } catch {
      toast.error("Failed to read clipboard");
    }
  };

  const handleClear = () => setInput("");

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate multiple cryptographic hashes from a given text simultaneously."
      toolId="hash-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-semibold">Input Text</Label>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={handlePaste}>
                <Plus className="h-3 w-3 mr-1" /> Paste
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive" onClick={handleClear}>
                <Trash2 className="h-3 w-3 mr-1" /> Clear
              </Button>
            </div>
          </div>
          <Textarea
            className="flex-1 min-h-[400px] resize-none focus-visible:ring-primary/50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here to generate hashes..."
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          <Label className="text-sm font-semibold mb-2">Generated Hashes</Label>
          <div className="space-y-4">
            {hashes.map((hash, index) => (
              <div key={hash.name} className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">{hash.name}</Label>
                <div className="relative">
                  <Input
                    className="font-mono text-sm pr-12 bg-muted/30 cursor-text focus-visible:ring-0 truncate"
                    value={hash.value}
                    readOnly
                    placeholder={`${hash.name} hash will appear here`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => handleCopy(index)}
                    disabled={!hash.value}
                  >
                    {hash.copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
