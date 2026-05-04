import Link from "next/link";
import { Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground p-1 rounded-md">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight">SDRK Dev Tools</span>
            </Link>
            <p className="text-sm text-muted-foreground w-full max-w-xs">
              Fast, clean, offline-first dev tools. The ultimate AI-powered developer toolkit.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools/json-formatter" className="hover:text-foreground">JSON Formatter</Link></li>
              <li><Link href="/tools/base64" className="hover:text-foreground">Base64 Encode/Decode</Link></li>
              <li><Link href="/tools/password-generator" className="hover:text-foreground">Password Generator</Link></li>
              <li><Link href="/tools" className="hover:text-foreground font-medium text-primary">All Tools &rarr;</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-foreground">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SDRK Dev Tools. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Built for Speed</span>
            <span>SEO Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
