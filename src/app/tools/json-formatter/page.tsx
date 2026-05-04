import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "JSON Formatter Online — Free, Fast & Instant | SDRK Dev Tools",
  description: "Format, validate and beautify JSON instantly in your browser. Free JSON formatter — no login, no limits. Syntax highlighting included.",
  alternates: {
    canonical: "/tools/json-formatter",
  },
};

export default function Page() {
  return <ClientPage />;
}
