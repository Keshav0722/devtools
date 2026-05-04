"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

export default function TimestampClient() {
  const [currentTimestampMs, setCurrentTimestampMs] = useState(Date.now());
  const [inputTs, setInputTs] = useState("");
  const [outputDate, setOutputDate] = useState("");
  
  const [inputDate, setInputDate] = useState("");
  const [outputTs, setOutputTs] = useState("");

  const [copiedStates, setCopiedStates] = useState({ currentMs: false, currentSec: false, outDate: false, outTs: false });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTimestampMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTsConvert = (val: string) => {
    setInputTs(val);
    if (!val) { setOutputDate(""); return; }
    
    let ts = Number(val);
    if (isNaN(ts)) {
      setOutputDate("Invalid Timestamp");
      return;
    }
    
    // Auto-detect seconds vs milliseconds
    if (val.length < 12) ts *= 1000;
    
    try {
      const d = new Date(ts);
      setOutputDate(d.toUTCString() + " | " + d.toLocaleString());
    } catch {
      setOutputDate("Error parsing timestamp");
    }
  };

  const handleDateConvert = (val: string) => {
    setInputDate(val);
    if (!val) { setOutputTs(""); return; }
    
    const parsed = Date.parse(val);
    if (isNaN(parsed)) {
      setOutputTs("Invalid Date Format");
    } else {
      setOutputTs(parsed.toString()); // Display resulting ms
    }
  };

  const handleCopy = (value: string, key: keyof typeof copiedStates) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedStates(p => ({ ...p, [key]: true }));
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
  };

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Easily convert epoch timestamps to human readable dates and vice versa."
      toolId="timestamp-converter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Current Unix Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground">Seconds (Epoch)</Label>
                  <div className="flex gap-2">
                    <Input readOnly value={Math.floor(currentTimestampMs / 1000)} className="font-mono bg-background" />
                    <Button variant="secondary" size="icon" onClick={() => handleCopy(Math.floor(currentTimestampMs / 1000).toString(), 'currentSec')}>
                      {copiedStates.currentSec ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs text-muted-foreground">Milliseconds</Label>
                  <div className="flex gap-2">
                    <Input readOnly value={currentTimestampMs} className="font-mono bg-background" />
                    <Button variant="secondary" size="icon" onClick={() => handleCopy(currentTimestampMs.toString(), 'currentMs')}>
                      {copiedStates.currentMs ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Timestamp to Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Unix Timestamp</Label>
                <Input 
                  placeholder="e.g. 1672531200" 
                  value={inputTs} 
                  onChange={(e) => handleTsConvert(e.target.value)} 
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>Resulting Date (UTC & Local)</Label>
                <div className="flex gap-2">
                  <Input readOnly value={outputDate} className="bg-muted/30" />
                  <Button disabled={!outputDate} variant="secondary" size="icon" onClick={() => handleCopy(outputDate, 'outDate')}>
                    {copiedStates.outDate ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Date to Timestamp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Human Readable Date</Label>
                <Input 
                  placeholder="e.g. 2024-01-01T00:00:00Z" 
                  value={inputDate} 
                  onChange={(e) => handleDateConvert(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label>Resulting Timestamp (Milliseconds)</Label>
                <div className="flex gap-2">
                  <Input readOnly value={outputTs} className="font-mono bg-muted/30" />
                  <Button disabled={!outputTs} variant="secondary" size="icon" onClick={() => handleCopy(outputTs, 'outTs')}>
                    {copiedStates.outTs ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
