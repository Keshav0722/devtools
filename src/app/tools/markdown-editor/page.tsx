import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Markdown Editor & Live Preview - SDRK Dev Tools",
  description: "Write and preview Github-Flavored Markdown instantly in your browser. Fast, local, and privacy-focused.",
};

export default function Page() {
  return <ClientPage />;
}
