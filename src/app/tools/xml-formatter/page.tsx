import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "XML Formatter & Validator - SDRK Dev Tools",
  description: "Format, indent, and beautify arbitrary XML documents safely within your browser.",
};

export default function Page() {
  return <ClientPage />;
}
