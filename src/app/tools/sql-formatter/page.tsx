import { Metadata } from "next";
import ClientPage from "./client";

export const metadata: Metadata = {
  title: "SQL Formatter Online — Beautify & Format SQL Free | SDRK Dev Tools",
  description: "Format messy SQL queries into clean, readable code instantly. Supports MySQL, PostgreSQL, SQLite. Free online SQL formatter.",
};

export default function Page() {
  return <ClientPage />;
}
