import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - SDRK Dev Tools",
  description: "Terms of Service for SDRK Dev Tools.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1>Terms of Service</h1>
        <p>Last updated: May 4, 2026</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using SDRK Dev Tools, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2>2. Use License</h2>
        <p>SDRK Dev Tools is provided &quot;as is&quot; and intended as a free utility for developers. You may use it for personal and commercial projects without restriction.</p>
        
        <h2>3. Disclaimer</h2>
        <p>The materials on SDRK Dev Tools&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h2>4. Limitations</h2>
        <p>In no event shall SDRK Dev Tools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SDRK Dev Tools&apos;s website.</p>
      </div>
    </div>
  );
}
