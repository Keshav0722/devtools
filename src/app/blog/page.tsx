import { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Developer Tools Blog and Engineering Guides",
  description:
    "Practical guides for JSON, JWT, regex, SQL, Base64, timestamps, password generation, and browser-based developer workflows.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Developer Tools Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Practical engineering guides for everyday debugging, formatting, encoding, and security workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="hover:border-primary/50 transition-colors shadow-sm">
            <CardHeader>
              <div className="text-sm text-muted-foreground">{post.readingTime}</div>
              <CardTitle className="text-xl leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:underline decoration-primary underline-offset-4">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
