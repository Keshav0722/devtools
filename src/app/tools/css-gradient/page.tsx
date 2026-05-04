import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "CSS Gradient Generator - SDRK Dev Tools",
  description: "Design beautiful CSS gradients, preview live results, and copy the raw cross-browser compatible CSS code.",
};

export default function Page() {
  return <ClientPage />;
}
