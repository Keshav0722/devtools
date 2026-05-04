import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder - SDRK Dev Tools",
  description: "Encode or extract URI components quickly. A fast, free online developer tool running entirely in the browser.",
};

export default function Page() {
  return <ClientPage />;
}
