import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Regex Tester Online — Test Regular Expressions Free | SDRK Dev Tools",
  description: "Test, match and debug regular expressions in real-time. Supports JS, Python, PHP regex. Free online regex tester.",
  alternates: {
    canonical: "/tools/regex-tester",
  },
};

export default function Page() {
  return <ClientPage />;
}
