import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SDRK Dev Tools",
  description: "Privacy Policy for SDRK Dev Tools.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1>Privacy Policy</h1>
        <p>Last updated: May 4, 2026</p>
        
        <h2>1. Information We Collect</h2>
        <p>SDRK Dev Tools operates entirely within your browser for the majority of our tools. We do not store, track, or harvest your code, inputs, or personal information.</p>
        
        <h2>2. Local Storage</h2>
        <p>Some features (like themes and recent tool history) may use your browser&apos;s LocalStorage to improve your experience. This data never leaves your device.</p>
        
        <h2>3. Third-Party APIs</h2>
        <p>A limited number of tools (such as IP Lookup) query external APIs. In these specific cases, the data required to perform the lookup is transmitted to the third-party provider securely.</p>
        
        <h2>4. Contact Us</h2>
        <p>If you have questions regarding our privacy practices, please contact the repository maintainers.</p>
      </div>
    </div>
  );
}
