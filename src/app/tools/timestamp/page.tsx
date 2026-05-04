import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - SDRK Dev Tools",
  description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Instant, free, and completely local.",
  alternates: {
    canonical: "/tools/timestamp",
  },
};

export default function Page() {
  return <ClientPage />;
}
