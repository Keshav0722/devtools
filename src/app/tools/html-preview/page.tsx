import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "HTML Editor & Live Sandbox Preview - SDRK Dev Tools",
  description: "Write and safely render custom HTML, CSS, and basic JavaScript in an isolated browser iframe.",
  alternates: {
    canonical: "/tools/html-preview",
  },
};

export default function Page() {
  return <ClientPage />;
}
