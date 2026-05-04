"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ColorConverterClient() {
  const [hex, setHex] = useState("#1f6bed");
  const [rgb, setRgb] = useState("rgb(31, 107, 237)");
  const [hsl, setHsl] = useState("hsl(218, 86%, 53%)");
  
  const [copied, setCopied] = useState("");

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return [r, g, b];
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const handleColorChange = (newHex: string) => {
    setHex(newHex);
    // Basic validation
    if (/^#([0-9A-Fa-f]{3}){1,2}$/i.test(newHex)) {
      const rgbArr = hexToRgb(newHex);
      setRgb(`rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`);
      
      const hslArr = rgbToHsl(rgbArr[0], rgbArr[1], rgbArr[2]);
      setHsl(`hsl(${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%)`);
    } else {
      setRgb("Invalid HEX");
      setHsl("Invalid HEX");
    }
  };

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <ToolLayout
      title="Color Format Converter"
      description="Visually pick colors or paste HEX codes to instantly extract their RGB and HSL data mapping."
      toolId="color-converter"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Massive native color input box UX */}
              <div className="h-64 rounded-xl border overflow-hidden shadow-sm relative">
                <input 
                   type="color" 
                   value={/^#([0-9A-Fa-f]{3}){1,6}$/i.test(hex) ? hex : "#ffffff"} 
                   onChange={(e) => handleColorChange(e.target.value)}
                   className="absolute -inset-4 w-[120%] h-[120%] cursor-crosshair opacity-0"
                />
                {/* Visual Fake Layer so it looks pretty */}
                <div 
                  className="w-full h-full pointer-events-none flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: /^#([0-9A-Fa-f]{3}){1,6}$/i.test(hex) ? hex : "#ffffff" }}
                >
                  <span className="bg-background/80 px-4 py-2 rounded-full font-mono font-bold shadow-sm backdrop-blur-sm">
                    {hex.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Manual HEX Input</Label>
                <Input 
                   value={hex}
                   onChange={(e) => handleColorChange(e.target.value)}
                   className="font-mono text-lg"
                   placeholder="#1F6BED"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-muted/10">
             <CardHeader className="py-4 border-b bg-muted/20">
               <CardTitle className="text-sm">Mapping Outputs</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6 pt-6">
               <div className="space-y-2">
                 <Label className="text-xs text-muted-foreground font-bold">HEX CODE</Label>
                 <div className="flex gap-2">
                    <Input readOnly value={hex.toUpperCase()} className="font-mono bg-background text-lg h-12" />
                    <Button onClick={() => handleCopy(hex.toUpperCase(), "hex")} variant="secondary" className="h-12 w-12 px-0 shrink-0">
                      {copied === "hex" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </Button>
                 </div>
               </div>

               <div className="space-y-2">
                 <Label className="text-xs text-muted-foreground font-bold">RGB FORMAT</Label>
                 <div className="flex gap-2">
                    <Input readOnly value={rgb} className="font-mono bg-background text-lg h-12" />
                    <Button disabled={rgb.includes("Invalid")} onClick={() => handleCopy(rgb, "rgb")} variant="secondary" className="h-12 w-12 px-0 shrink-0">
                      {copied === "rgb" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </Button>
                 </div>
               </div>

               <div className="space-y-2">
                 <Label className="text-xs text-muted-foreground font-bold">HSL FORMAT</Label>
                 <div className="flex gap-2">
                    <Input readOnly value={hsl} className="font-mono bg-background text-lg h-12" />
                    <Button disabled={hsl.includes("Invalid")} onClick={() => handleCopy(hsl, "hsl")} variant="secondary" className="h-12 w-12 px-0 shrink-0">
                      {copied === "hsl" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
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
