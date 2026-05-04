"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (useUppercase) charset += UPPERCASE;
    if (useLowercase) charset += LOWERCASE;
    if (useNumbers) charset += NUMBERS;
    if (useSymbols) charset += SYMBOLS;

    if (!charset) {
      toast.error("Please select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Secure Password Generator"
      description="Create strong, randomized passwords. Generation happens locally."
      toolId="password-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <Card className="bg-card">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Password Length: {length}</Label>
                </div>
                <Slider
                  value={[length]}
                  min={4}
                  max={64}
                  step={1}
                  onValueChange={(value) => setLength(Array.isArray(value) ? value[0] : value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="uppercase" checked={useUppercase} onCheckedChange={(c) => setUseUppercase(c as boolean)} />
                  <Label htmlFor="uppercase">Include Uppercase (A-Z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lowercase" checked={useLowercase} onCheckedChange={(c) => setUseLowercase(c as boolean)} />
                  <Label htmlFor="lowercase">Include Lowercase (a-z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="numbers" checked={useNumbers} onCheckedChange={(c) => setUseNumbers(c as boolean)} />
                  <Label htmlFor="numbers">Include Numbers (0-9)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="symbols" checked={useSymbols} onCheckedChange={(c) => setUseSymbols(c as boolean)} />
                  <Label htmlFor="symbols">Include Symbols (!@#$)</Label>
                </div>
              </div>
              <Button onClick={generatePassword} className="w-full gap-2">
                <RefreshCw className="w-4 h-4" />
                Generate password
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-muted/30 border-primary/20">
            <CardContent className="pt-6">
              <div className="relative">
                <Input
                  className="font-mono text-2xl h-24 text-center pr-24 bg-background"
                  value={password}
                  readOnly
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button variant="ghost" size="icon" onClick={generatePassword}>
                    <RefreshCw className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={handleCopy}>
                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
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
