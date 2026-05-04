import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - SDRK Dev Tools",
  description: "Disclaimer for SDRK Dev Tools.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1>Disclaimer</h1>
        <p>Last updated: May 4, 2026</p>
        
        <h2>General Information</h2>
        <p>The information and tools provided by SDRK Dev Tools are for general informational and utility purposes only. All tools on the site are provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any tools or information on the site.</p>
        
        <h2>Professional Advice</h2>
        <p>The Site cannot and does not contain professional, cryptographic, or specific technical advice. The use or reliance of any tools (such as password generators or cryptographic hashes) contained on this site is solely at your own risk. Always consult with security professionals before implementing cryptology schemas in production.</p>
        
        <h2>External Links</h2>
        <p>The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
      </div>
    </div>
  );
}
