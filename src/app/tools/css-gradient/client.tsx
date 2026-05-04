"use client";

import { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Copy, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function CssGradientClient() {
  const [colors, setColors] = useState(["#1f6bed", "#f4ff1e"]);
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);
  const gradientCss =
    type === "linear"
      ? `background: linear-gradient(${angle}deg, ${colors.join(", ")});`
      : `background: radial-gradient(circle, ${colors.join(", ")});`;

  const addColor = () => {
    if (colors.length >= 6) {
      toast.error("Maximum of 6 colors allowed");
      return;
    }
    setColors([...colors, "#ffffff"]);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 2) {
      toast.error("At least 2 colors are required");
      return;
    }
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const updateColor = (index: number, val: string) => {
    const newColors = [...colors];
    newColors[index] = val;
    setColors(newColors);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gradientCss);
    setCopied(true);
    toast.success("CSS copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      description="Design linear and radial gradients visually, and grab the raw CSS instantly."
      toolId="css-gradient"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
        {/* Controls Layer */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                Gradient Configuration
                <div className="flex gap-2">
                  <Button
                    variant={type === "linear" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setType("linear")}
                  >Linear</Button>
                   <Button
                    variant={type === "radial" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setType("radial")}
                  >Radial</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {type === "linear" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Angle</Label>
                    <span className="text-sm font-medium">{angle}°</span>
                  </div>
                  <Slider 
                    value={[angle]} 
                    min={0} 
                    max={360} 
                    step={1} 
                    onValueChange={(value) => setAngle(Array.isArray(value) ? value[0] : value)} 
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Color Stops</Label>
                  <Button variant="ghost" size="sm" onClick={addColor} className="h-8">
                    <Plus className="w-4 h-4 mr-1" /> Add Color
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {colors.map((color, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="h-10 w-10 border rounded overflow-hidden shrink-0">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => updateColor(index, e.target.value)}
                          className="h-14 w-14 -m-2 cursor-pointer"
                        />
                      </div>
                      <Input
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="font-mono"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => removeColor(index)}
                        disabled={colors.length <= 2}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview & Code Layer */}
        <div className="space-y-6 flex flex-col pt-1">
          <Card className="flex-1 min-h-[300px] overflow-hidden flex relative">
            {/* The transparent checkerboard pattern under exactly the gradient area */}
            <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIvPgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlZWVlZWUiLz4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlZWVlZWUiLz4KPC9zdmc+')] opacity-20 dark:opacity-10" />
            <div
              className="absolute inset-0 z-10 transition-all duration-300 ease-out"
              style={{ background: gradientCss.replace("background: ", "").replace(";", "") }}
            />
          </Card>
          
          <Card>
            <CardHeader className="py-3 flex flex-row items-center justify-between border-b">
               <CardTitle className="text-sm">Raw CSS Config</CardTitle>
               <Button onClick={handleCopy} size="sm" variant="secondary">
                 {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                 Copied
               </Button>
            </CardHeader>
            <CardContent className="p-0">
               <Textarea 
                 readOnly 
                 value={gradientCss}
                 className="resize-none border-0 font-mono text-base p-4 min-h-[100px] focus-visible:ring-0"
               />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
