import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - SDRK Dev Tools",
  description: "Cookie Policy for SDRK Dev Tools.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
        <h1>Cookie Policy</h1>
        <p>Last updated: May 4, 2026</p>
        
        <h2>What are cookies?</h2>
        <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. Our website uses minimal cookies to ensure you get the best experience.</p>
        
        <h2>How we use cookies</h2>
        <p>SDRK Dev Tools is designed to be privacy-first. We do not use advertising cookies, tracking pixels, or intrusive third-party analytical cookies. We rely primarily on HTML5 LocalStorage rather than cookies to remember your preferences (like Light/Dark mode or your Favorite tools).</p>
        
        <h2>Managing cookies</h2>
        <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies or LocalStorage, please note that some parts of this site may become inaccessible or not function properly.</p>
      </div>
    </div>
  );
}
