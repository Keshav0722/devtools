import { MetadataRoute } from 'next';
import { toolsList } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sdrk-dev-tools.vercel.app";
  const lastModified = new Date();

  // Core static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookie-policy",
    "/disclaimer",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Tool routes mapping natively
  const toolRoutes = toolsList.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dummy blog routes mapping
  const blogSlugs = [
    "how-to-format-json-in-python-js-online",
    "jwt-vs-session-tokens-when-to-use-which",
    "top-10-free-online-developer-tools",
    "regex-cheatsheet-2026",
    "how-to-minify-javascript-for-production",
    "md5-vs-sha256-which-hash-function",
    "complete-guide-to-base64-encoding-decoding",
    "best-free-postman-alternatives-2026",
    "sql-formatting-best-practices",
    "uuid-vs-ulid-choosing-unique-id",
    "how-cron-jobs-work-visual-guide",
    "url-encoding-explained-why-percent-20",
    "code-minification-vs-bundling",
    "online-html-preview-tools-compared",
    "generate-cryptographically-secure-passwords",
    "ip-address-lookup-tools-how-they-work",
    "markdown-vs-html-for-docs",
    "color-hex-rgb-hsl-converter-guide",
    "timestamp-conversion-in-javascript",
    "diff-checker-tools-compare-code-online",
    "10-regex-patterns-every-developer-should-memorize",
    "free-developer-tools-that-replace-paid-software",
    "how-to-debug-jwt-authentication-issues",
    "sql-vs-nosql-key-differences",
    "how-to-test-rest-apis-without-postman"
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
