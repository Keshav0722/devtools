"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function UUIDGeneratorClient() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateUUIDs = useCallback(() => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      let id = crypto.randomUUID();
      if (uppercase) id = id.toUpperCase();
      if (removeHyphens) id = id.replace(/-/g, "");
      newUuids.push(id);
    }
    setUuids(newUuids);
  }, [count, uppercase, removeHyphens]);

  const handleCopy = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    toast.success(`${count} UUID${count > 1 ? 's' : ''} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="UUID (v4) Generator"
      description="Create secure, truly random version-4 UUIDs instantly in your browser."
      toolId="uuid-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Quantity to Generate: {count}</Label>
                </div>
                <Slider
                  value={[count]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={(value) => setCount(Array.isArray(value) ? value[0] : value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="uppercase" checked={uppercase} onCheckedChange={(c) => setUppercase(c as boolean)} />
                  <Label htmlFor="uppercase">Uppercase output format</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hyphens" checked={removeHyphens} onCheckedChange={(c) => setRemoveHyphens(c as boolean)} />
                  <Label htmlFor="hyphens">Strip hyphens (e.g. f47ac10b...)</Label>
                </div>
              </div>
              
              <Button onClick={generateUUIDs} className="w-full mt-4 gap-2">
                <RefreshCw className="w-4 h-4" />
                Regenerate UUIDs
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-muted/30 border-primary/20 h-[400px] flex flex-col overflow-hidden">
            <CardHeader className="py-3 flex flex-row items-center justify-between border-b bg-muted/10">
              <span className="text-sm font-medium">Output ({count})</span>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied" : "Copy All"}
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <Textarea
                className="w-full h-full border-0 resize-none rounded-none focus-visible:ring-0 font-mono p-4 bg-transparent"
                value={uuids.join("\n")}
                readOnly
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
