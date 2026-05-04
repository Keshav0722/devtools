import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Text Diff Checker - SDRK Dev Tools",
  description: "Compare two pieces of text side-by-side to highlight additions, deletions, and differences instantly in your browser.",
  alternates: {
    canonical: "/tools/diff-checker",
  },
};

export default function Page() {
  return <ClientPage />;
}
