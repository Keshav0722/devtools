import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "UUID Generator Online — Generate v1, v3, v4, v5 UUIDs Free | SDRK Dev Tools",
  description: "Generate UUID v4 (random) or other versions instantly. Bulk UUID generation supported. Free online tool.",
  alternates: {
    canonical: "/tools/uuid",
  },
};

export default function Page() {
  return <ClientPage />;
}
