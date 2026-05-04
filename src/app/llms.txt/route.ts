import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";
import { toolsList } from "@/lib/tools";

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    siteConfig.description,
    "",
    "## Tools",
    ...toolsList.map((tool) => `- ${tool.name}: ${siteConfig.url}${tool.href}`),
    "",
    "## Guides",
    ...blogPosts.map((post) => `- ${post.title}: ${siteConfig.url}/blog/${post.slug}`),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
