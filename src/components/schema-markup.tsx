import React from "react";

interface SchemaMarkupProps {
  toolName: string;
  toolDescription: string;
  toolUrlSlug: string;
}

export default function SchemaMarkup({ toolName, toolDescription, toolUrlSlug }: SchemaMarkupProps) {
  const baseUrl = "https://sdrk-dev-tools.vercel.app";
  const toolUrl = `${baseUrl}/tools/${toolUrlSlug}`;

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
    "browserRequirements": "HTML5, JavaScript",
    "featureList": `${toolName}, instant browser processing, offline-first, free tools, no login required`
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
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${baseUrl}/#tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolName,
        "item": toolUrl
      }
    ]
  };

  // 3. FAQPage Schema (Generic fallbacks generated dynamically)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is the ${toolName} free to use?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, the ${toolName} provided by SDRK Dev Tools is 100% free to use. There are no logins, subscriptions, or hidden limits.`
        }
      },
      {
        "@type": "Question",
        "name": `Is my data safe when using the ${toolName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely. The ${toolName} operates entirely within your browser locally. No data is sent to or stored on our servers.`
        }
      },
      {
        "@type": "Question",
        "name": `Do I need to install anything to use the ${toolName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `No installations are required. The ${toolName} is a browser-based utility that works instantly on any modern web browser across Windows, Mac, Linux, and mobile devices.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
