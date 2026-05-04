import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Strong Password Generator Online — Free & Secure | SDRK Dev Tools",
  description: "Generate strong random passwords with custom length, symbols & numbers. Free secure password generator.",
};

export default function Page() {
  return <ClientPage />;
}
