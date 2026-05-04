import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { toolsList } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-05-04");

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/tools", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: updated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const toolRoutes = toolsList.map((tool) => ({
    url: absoluteUrl(tool.href),
    lastModified: updated,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
