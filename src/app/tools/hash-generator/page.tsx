import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Hash Generator Online — MD5, SHA1, SHA256 Free | SDRK Dev Tools",
  description: "Generate MD5, SHA1, SHA256, SHA512 hashes instantly. Free hash generator — browser-based, no server processing.",
  alternates: {
    canonical: "/tools/hash-generator",
  },
};

export default function Page() {
  return <ClientPage />;
}
