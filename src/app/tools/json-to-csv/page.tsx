import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "JSON to CSV Converter - SDRK Dev Tools",
  description: "Convert JSON objects and arrays into structured CSV format. Fully local operation with secure, instant results.",
};

export default function Page() {
  return <ClientPage />;
}
