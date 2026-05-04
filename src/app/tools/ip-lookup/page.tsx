import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "IP Address Lookup Tool - SDRK Dev Tools",
  description: "Identify Geolocation data, ISP routing, and ASN infrastructure coordinates attached to exact IP addresses using our API integration.",
  alternates: {
    canonical: "/tools/ip-lookup",
  },
};

export default function Page() {
  return <ClientPage />;
}
