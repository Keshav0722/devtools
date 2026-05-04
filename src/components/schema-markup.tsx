import React from "react";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { toolsList } from "@/lib/tools";

interface SchemaMarkupProps {
  toolName: string;
  toolDescription: string;
  toolUrlSlug: string;
}

export default function SchemaMarkup({ toolName, toolDescription, toolUrlSlug }: SchemaMarkupProps) {
  const tool = toolsList.find((item) => item.id === toolUrlSlug);
  const toolUrl = absoluteUrl(tool?.href ?? `/tools/${toolUrlSlug}`);

  // 1. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${toolName} Online`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": toolDescription,
    "url": toolUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "browserRequirements": "HTML5, JavaScript",
    "featureList": [
      toolName,
      "Instant browser processing",
      "Local-first input handling",
      "No login required"
    ]
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${siteConfig.url}/#tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolName,
        "item": toolUrl
      }
    ]
  };

  const stringify = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringify(breadcrumbSchema) }}
      />
    </>
  );
}
