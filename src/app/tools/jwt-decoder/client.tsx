"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JwtDecoderClient() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [errorProps, setErrorProps] = useState<string | null>(null);

  const [copied, setCopied] = useState({ header: false, payload: false });

  const decodeJWT = (jwt: string) => {
    if (!jwt.trim()) {
      setHeader("");
      setPayload("");
      setErrorProps(null);
      return;
    }

    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) {
        throw new Error("A valid JWT must have 3 parts separated by dots.");
      }

      // Base64URL decode
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) {
          base64 += "=";
        }
        return JSON.parse(decodeURIComponent(escape(atob(base64))));
      };

      const decodedHeader = decodeBase64Url(parts[0]);
      const decodedPayload = decodeBase64Url(parts[1]);

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setErrorProps(null);
    } catch (e: any) {
      setHeader("");
      setPayload("");
      setErrorProps("Invalid JWT signature or format.");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => decodeJWT(token), 200);
    return () => clearTimeout(handler);
  }, [token]);

  const handleCopy = (type: "header" | "payload") => {
    const val = type === "header" ? header : payload;
    if (!val) return;
    navigator.clipboard.writeText(val);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied(c => ({ ...c, [type]: false })), 2000);
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Safely decode JSON Web Tokens entirely within your browser to verify claims and header metadata."
      toolId="jwt-decoder"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
        {/* Input */}
        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-semibold mb-2">Encoded JWT Token</Label>
          <Textarea
            className="flex-1 min-h-[400px] resize-none focus-visible:ring-primary/50 text-base font-mono leading-relaxed"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          />
          {errorProps && <p className="text-sm text-destructive mt-2">{errorProps}</p>}
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-6">
          <Card className="flex-1 bg-muted/20">
            <CardHeader className="py-3 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-sm">Header (Algorithm & Type)</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => handleCopy("header")} disabled={!header} className="h-6 w-6">
                 {copied.header ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Textarea
                className="w-full h-32 border-0 resize-none font-mono bg-transparent text-primary"
                value={header}
                readOnly
              />
            </CardContent>
          </Card>

          <Card className="flex-[2] bg-muted/20">
            <CardHeader className="py-3 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-sm">Payload (Data Claims)</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => handleCopy("payload")} disabled={!payload} className="h-6 w-6">
                 {copied.payload ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent className="p-0 h-[250px]">
              <Textarea
                className="w-full h-full border-0 resize-none font-mono bg-transparent text-purple-600 dark:text-purple-400"
                value={payload}
                readOnly
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
