import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SDRK Dev Tools",
  description: "Get in touch with the SDRK Dev Tools team for support, feedback, or feature requests.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We would love to hear from you! Whether you have a question about our tools, want to request a new feature, or simply want to say hello, feel free to reach out.
      </p>
      
      <div className="bg-muted/50 border border-border/50 rounded-xl p-8 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong>Email:</strong> <a href="mailto:support@sdrk-dev-tools.com" className="text-primary hover:underline">support@sdrk-dev-tools.com</a>
          </p>
          <p>
            <strong>GitHub:</strong> <a href="https://github.com/Keshav0722/devtools" target="_blank" rel="noreferrer" className="text-primary hover:underline">github.com/Keshav0722/devtools</a>
          </p>
          <p>
            <strong>Twitter:</strong> <a href="#" className="text-primary hover:underline">@sdrk_tools</a>
          </p>
        </div>
      </div>
    </div>
  );
}
