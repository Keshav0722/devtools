import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode & Verify JSON Web Tokens Online | SDRK Dev Tools",
  description: "Decode JWT tokens instantly. View header, payload and signature. Free online JWT decoder — no login required.",
  alternates: {
    canonical: "/tools/jwt-decoder",
  },
};

export default function Page() {
  return <ClientPage />;
}
