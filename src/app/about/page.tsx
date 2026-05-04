import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SDRK Dev Tools",
  description: "Learn more about SDRK Dev Tools, the fastest AI-powered developer utilities platform.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">About SDRK Dev Tools</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          SDRK Dev Tools was created with a simple mission: to provide the fastest, most reliable, and secure developer utilities right in your browser.
        </p>
        <p className="mb-4">
          We noticed that many developer tools online were slow, riddled with ads, or sent sensitive data like JSON payloads and API keys to remote servers. We decided to build a platform that respects your privacy.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Core Principles</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Offline-First & Local Processing:</strong> Almost all of our tools run entirely in your browser using modern web APIs. Your data never leaves your machine.</li>
          <li><strong>High Performance:</strong> We use Next.js and optimized algorithms to ensure our tools load instantly.</li>
          <li><strong>Free Forever:</strong> No paywalls, no limits, no login required.</li>
        </ul>
      </div>
    </div>
  );
}
