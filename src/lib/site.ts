export const siteConfig = {
  name: "SDRK Dev Tools",
  url: "https://sdrk-dev-tools.vercel.app",
  tagline: "Free online developer tools that run in your browser",
  description:
    "Fast, private, browser-based developer tools for formatting JSON, decoding JWTs, testing regex, generating hashes, converting Base64, formatting SQL, and more.",
  email: "support@sdrk-dev-tools.com",
  githubUrl: "https://github.com/Keshav0722/devtools",
  twitterHandle: "@sdrk_tools",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
