import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { toolsList } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(url),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedTools = post.relatedToolIds
    .map((id) => toolsList.find((tool) => tool.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
    },
    "mainEntityOfPage": absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b border-border/50 pb-8 mb-10">
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-8 text-muted-foreground">{post.description}</p>
        <div className="mt-5 text-sm text-muted-foreground">
          Updated {post.updatedAt} - {post.readingTime}
        </div>
      </header>

      <div className="space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      {relatedTools.length > 0 ? (
        <aside className="mt-14 border-t border-border/50 pt-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Related tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              tool ? <ToolCard key={tool.id} tool={tool} /> : null
            ))}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
