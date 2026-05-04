import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - SDRK Dev Tools",
  description: "Encode text to Base64 or Decode Base64 to text instantly. Fast, secure, and fully running in your browser.",
  alternates: {
    canonical: "/tools/base64",
  },
};

export default function Page() {
  return <ClientPage />;
}
