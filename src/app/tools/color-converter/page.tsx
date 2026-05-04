import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "Color Format Converter - SDRK Dev Tools",
  description: "Instantly translate colors between HEX, RGB, and HSL formats with a visual interactive color picker.",
  alternates: {
    canonical: "/tools/color-converter",
  },
};

export default function Page() {
  return <ClientPage />;
}
