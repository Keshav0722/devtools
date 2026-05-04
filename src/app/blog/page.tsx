import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Engineering Blog & Resources - SDRK Dev Tools",
  description: "Read our latest articles on web development, cryptography, and tooling architecture. Discover deep-dive tutorials on JSON, JWT, Regex, and SQL.",
};

const posts = [
  { slug: "how-to-format-json-in-python-js-online", title: "How to Format JSON in Python, JS & Online (2026 Guide)" },
  { slug: "jwt-vs-session-tokens-when-to-use-which", title: "JWT vs Session Tokens — When to Use Which" },
  { slug: "top-10-free-online-developer-tools", title: "Top 10 Free Online Developer Tools Every Dev Needs" },
  { slug: "regex-cheatsheet-2026", title: "Regex Cheatsheet 2026 — Patterns Every Dev Should Know" },
  { slug: "how-to-minify-javascript-for-production", title: "How to Minify JavaScript for Production (No Build Tools)" },
  { slug: "md5-vs-sha256-which-hash-function", title: "MD5 vs SHA256 — Which Hash Function Should You Use?" },
  { slug: "complete-guide-to-base64-encoding-decoding", title: "Complete Guide to Base64 Encoding & Decoding" },
  { slug: "best-free-postman-alternatives-2026", title: "Best Free Postman Alternatives in 2026" },
  { slug: "sql-formatting-best-practices", title: "SQL Formatting Best Practices for Readable Queries" },
  { slug: "uuid-vs-ulid-choosing-unique-id", title: "UUID vs ULID — Choosing the Right Unique ID" },
  { slug: "how-cron-jobs-work-visual-guide", title: "How Cron Jobs Work — A Visual Guide + Generator" },
  { slug: "url-encoding-explained-why-percent-20", title: "URL Encoding Explained — Why %20 Replaces Spaces" },
  { slug: "code-minification-vs-bundling", title: "Code Minification vs Bundling — What's the Difference?" },
  { slug: "online-html-preview-tools-compared", title: "Online HTML Preview Tools Compared (2026)" },
  { slug: "generate-cryptographically-secure-passwords", title: "How to Generate Cryptographically Secure Passwords" },
  { slug: "ip-address-lookup-tools-how-they-work", title: "IP Address Lookup Tools — How They Work & Best Free Tools" },
  { slug: "markdown-vs-html-for-docs", title: "Markdown vs HTML — Which Should You Use for Docs?" },
  { slug: "color-hex-rgb-hsl-converter-guide", title: "Color Hex, RGB, HSL Converter — The Complete Guide" },
  { slug: "timestamp-conversion-in-javascript", title: "Timestamp Conversion in JavaScript — Unix, ISO, Local" },
  { slug: "diff-checker-tools-compare-code-online", title: "Diff Checker Tools — Compare Code Changes Online" },
  { slug: "10-regex-patterns-every-developer-should-memorize", title: "10 Regex Patterns Every Developer Should Memorize" },
  { slug: "free-developer-tools-that-replace-paid-software", title: "Free Developer Tools That Replace Paid Software" },
  { slug: "how-to-debug-jwt-authentication-issues", title: "How to Debug JWT Authentication Issues" },
  { slug: "sql-vs-nosql-key-differences", title: "SQL vs NoSQL — Key Differences & When to Use Each" },
  { slug: "how-to-test-rest-apis-without-postman", title: "How to Test REST APIs Without Postman" }
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Engineering Blog</h1>
        <p className="text-xl text-muted-foreground">Insights, architecture notes, and web development deep dives.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Card key={post.slug} className="hover:border-primary/50 transition-colors shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:underline decoration-primary underline-offset-4">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
