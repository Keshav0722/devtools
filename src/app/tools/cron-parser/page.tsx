import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Cron Parser & Validator - SDRK Dev Tools",
  description: "Translate complex Cron expressions into human-readable definitions and view upcoming execution timelines.",
};

export default function Page() {
  return <ClientPage />;
}
