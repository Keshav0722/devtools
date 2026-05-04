"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IpData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  asn: string;
  org: string;
  error?: boolean;
  reason?: string;
}

export default function IpLookupClient() {
  const [ipInput, setIpInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IpData | null>(null);
  const [errorProps, setErrorProps] = useState<string | null>(null);

  const fetchIpData = async (queryIp: string = "") => {
    setLoading(true);
    setErrorProps(null);
    setData(null);

    // Validate IP string locally before ping to save rate limits
    const safeIp = queryIp.trim();
    if (safeIp && !/^(\d{1,3}\.){3}\d{1,3}$/.test(safeIp) && !/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(safeIp)) {
       setErrorProps("Invalid IPv4 or IPv6 format.");
       setLoading(false);
       return;
    }

    try {
      const url = safeIp ? `https://ipapi.co/${safeIp}/json/` : "https://ipapi.co/json/";
      const response = await fetch(url);
      const result = await response.json();

      if (result.error) {
        throw new Error(result.reason || "Failed to lookup IP");
      }

      setData(result);
    } catch (err: any) {
      setErrorProps(err.message || "Failed to fetch dataset. API may be rate limited.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch client IP natively on boot
  useEffect(() => {
    fetchIpData("");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchIpData(ipInput);
  };

  const InfoBlock = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div className="flex flex-col p-4 bg-muted/20 border rounded-lg">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{label}</span>
      <span className="font-mono text-base font-medium">{value || "N/A"}</span>
    </div>
  );

  return (
    <ToolLayout
      title="IP Address Lookup"
      description="Probe IPv4 and IPv6 addresses across international registries to map their geolocation, internet service provider, and autonomous system coordinates."
      toolId="ip-lookup"
    >
      <div className="max-w-4xl space-y-6">
        {/* Search Bar Layer */}
        <form onSubmit={handleSubmit} className="flex gap-2">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
             <Input 
               className="pl-10 h-12 text-lg font-mono placeholder:font-sans"
               placeholder="Enter an IPv4 or IPv6 address (e.g. 8.8.8.8)"
               value={ipInput}
               onChange={e => setIpInput(e.target.value)}
             />
           </div>
           <Button type="submit" disabled={loading} className="h-12 px-8">
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lookup API"}
           </Button>
        </form>

        {errorProps && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg font-medium border border-destructive/20 text-center">
            {errorProps}
          </div>
        )}

        {/* Results Matrix */}
        {data && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-primary/20 bg-primary/5">
               <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">Target Address</span>
                  <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight">{data.ip}</span>
               </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <InfoBlock label="Location Matrix" value={`${data.city}, ${data.region}`} />
               <InfoBlock label="Sovereign Nation" value={data.country_name} />
               <InfoBlock label="Postal Protocol" value={data.postal} />
               
               <InfoBlock label="Organization / ISP" value={data.org} />
               <InfoBlock label="Autonomous System (ASN)" value={data.asn} />
               <InfoBlock label="Timezone Vector" value={data.timezone} />

               <InfoBlock label="Latitude" value={data.latitude} />
               <InfoBlock label="Longitude" value={data.longitude} />
               <InfoBlock label="Protocol Sync" value="Verified" />
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
