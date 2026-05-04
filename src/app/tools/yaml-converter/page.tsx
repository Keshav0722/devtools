import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "YAML to JSON / JSON to YAML Converter - SDRK Dev Tools",
  description: "Convert YAML configurations to JSON or JSON to YAML securely and offline.",
  alternates: {
    canonical: "/tools/yaml-converter",
  },
};

export default function Page() {
  return <ClientPage />;
}
