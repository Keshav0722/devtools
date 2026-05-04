import { Paintbrush, Code, Hash, Lock, Search, FileJson, Link, Database, Code2, TextSelect, FileText, AlignLeft, CalendarClock, Pipette, Fingerprint, FileSpreadsheet, Edit3, Key, FilePlus2, GitCompare, CodeSquare, Regex, Clock, Palette, MapPin, FileCode2 } from "lucide-react";

export type ToolCategory = "Data & Encoders" | "Generators" | "Web & Regex" | "Deep Tools";

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: any; // Lucide icon
  category: ToolCategory;
  keywords: string[];
}

export const toolsList: ToolItem[] = [
  // --- Data & Encoders ---
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify your JSON data instantly.",
    href: "/tools/json-formatter",
    icon: FileJson,
    category: "Data & Encoders",
    keywords: ["json", "formatter", "validator", "beautify", "json to json"]
  },
  {
    id: "base64-encode-decode",
    name: "Base64 Encoder/Decoder",
    description: "Convert text to Base64 and vice-versa.",
    href: "/tools/base64",
    icon: Code2,
    category: "Data & Encoders",
    keywords: ["base64", "encode", "decode", "converter"]
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    description: "Encode or Decode URL strings to safely pass data.",
    href: "/tools/url-encode",
    icon: Link,
    category: "Data & Encoders",
    keywords: ["url", "encode", "decode", "uri"]
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV",
    description: "Convert JSON arrays into downloadable CSV formats.",
    href: "/tools/json-to-csv",
    icon: FileSpreadsheet,
    category: "Data & Encoders",
    keywords: ["json", "csv", "convert", "export", "extract"]
  },
  {
    id: "yaml-converter",
    name: "YAML <-> JSON",
    description: "Convert YAML sequences to JSON and vice-versa.",
    href: "/tools/yaml-converter",
    icon: FilePlus2,
    category: "Data & Encoders",
    keywords: ["yaml", "json", "convert", "yml", "encoder"]
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    description: "Format, indent, and beautify arbitrary XML documents safely.",
    href: "/tools/xml-formatter",
    icon: FileCode2,
    category: "Data & Encoders",
    keywords: ["xml", "format", "beautify", "indent"]
  },

  // --- Generators ---
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 and more hashes.",
    href: "/tools/hash-generator",
    icon: Hash,
    category: "Generators",
    keywords: ["hash", "md5", "sha256", "sha1", "crypto"]
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create highly secure random passwords with specific rules.",
    href: "/tools/password-generator",
    icon: Lock,
    category: "Generators",
    keywords: ["password", "generator", "security", "random"]
  },
  {
    id: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates.",
    href: "/tools/timestamp",
    icon: CalendarClock,
    category: "Generators",
    keywords: ["epoch", "timestamp", "date", "time", "convert"]
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate universally unique identifiers (v4).",
    href: "/tools/uuid",
    icon: Fingerprint,
    category: "Generators",
    keywords: ["uuid", "guid", "generator", "unique"]
  },

  // --- Web & Regex ---
  {
    id: "markdown-editor",
    name: "Markdown Editor",
    description: "Live Markdown editor and previewer with generic syntax support.",
    href: "/tools/markdown-editor",
    icon: Edit3,
    category: "Web & Regex",
    keywords: ["markdown", "editor", "preview", "github", "text"]
  },
  {
    id: "html-preview",
    name: "HTML Preview",
    description: "Write custom HTML, CSS, and JS to instantly render in a sterile iframe.",
    href: "/tools/html-preview",
    icon: CodeSquare,
    category: "Web & Regex",
    keywords: ["html", "css", "preview", "render", "web"]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Test regular expressions safely and find text matches directly in your DOM.",
    href: "/tools/regex-tester",
    icon: Regex,
    category: "Web & Regex",
    keywords: ["regex", "regular expression", "test", "match", "find"]
  },
  {
    id: "css-gradient",
    name: "CSS Gradient Generator",
    description: "Generate beautiful custom CSS gradients and grab the raw code.",
    href: "/tools/css-gradient",
    icon: Paintbrush,
    category: "Web & Regex",
    keywords: ["css", "gradient", "color", "generator", "design"]
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Instantly translate color formats (HEX, RGB, HSL) with live visualizer.",
    href: "/tools/color-converter",
    icon: Palette,
    category: "Web & Regex",
    keywords: ["color", "hex", "rgb", "hsl", "convert", "picker"]
  },

  // --- Deep Tools ---
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens and view header/payload claims.",
    href: "/tools/jwt-decoder",
    icon: Key,
    category: "Deep Tools",
    keywords: ["jwt", "decode", "token", "json web token"]
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Format and beautify complex SQL queries into readable tables.",
    href: "/tools/sql-formatter",
    icon: Database,
    category: "Deep Tools",
    keywords: ["sql", "format", "query", "beautify", "database"]
  },
  {
    id: "diff-checker",
    name: "Text Diff Checker",
    description: "Compare two blocks of text side-by-side to highlight differences.",
    href: "/tools/diff-checker",
    icon: GitCompare,
    category: "Deep Tools",
    keywords: ["diff", "compare", "checker", "text", "difference"]
  },
  {
    id: "cron-parser",
    name: "Cron Parser",
    description: "Translate Cron schedule expressions into readable timelines.",
    href: "/tools/cron-parser",
    icon: Clock,
    category: "Deep Tools",
    keywords: ["cron", "schedule", "parser", "time", "job"]
  },
  {
    id: "ip-lookup",
    name: "IP Address Lookup",
    description: "Lookup Geolocation, ISP, and ASN logic mapped to IP addresses via API.",
    href: "/tools/ip-lookup",
    icon: MapPin,
    category: "Deep Tools",
    keywords: ["ip", "address", "lookup", "geolocation", "asn"]
  }
];
