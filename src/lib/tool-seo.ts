export interface ToolSeoCopy {
  summary: string;
  useCases: string[];
  tips: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

const defaultFaq = (toolName: string) => [
  {
    question: `Is ${toolName} free?`,
    answer:
      "Yes. You can use it without creating an account, installing software, or paying for a subscription.",
  },
  {
    question: `Does ${toolName} upload my data?`,
    answer:
      "No. The tool runs in your browser, so pasted code, tokens, and text stay on your device.",
  },
];

export const toolSeoCopy: Record<string, ToolSeoCopy> = {
  "json-formatter": {
    summary:
      "Paste JSON to format, validate, and inspect it instantly. This is useful for API responses, configuration files, logs, and webhook payloads where readability and quick error detection matter.",
    useCases: [
      "Pretty print compact JSON from APIs, browser consoles, or logs.",
      "Find syntax errors before sending JSON to an API or config file.",
      "Minify formatted JSON when you need a smaller payload.",
    ],
    tips: [
      "Use two-space indentation for shared JSON snippets because it stays readable without adding much size.",
      "Validate before copying into production config so missing commas or trailing characters are caught early.",
    ],
    faq: defaultFaq("the JSON formatter"),
  },
  "base64-encode-decode": {
    summary:
      "Encode plain text to Base64 or decode Base64 back to readable text in one step. It is handy for API testing, data URLs, headers, and debugging encoded payloads.",
    useCases: [
      "Decode Base64 values found in headers, logs, and sample payloads.",
      "Encode short strings for testing APIs and documentation examples.",
      "Check whether an encoded value contains readable UTF-8 text.",
    ],
    tips: [
      "Base64 is encoding, not encryption; do not treat decoded secrets as protected.",
      "If decoded output looks broken, confirm whether the original value is binary data rather than text.",
    ],
    faq: defaultFaq("the Base64 encoder and decoder"),
  },
  "url-encoder-decoder": {
    summary:
      "Encode and decode URL components safely for query strings, redirects, webhook URLs, and API requests. It helps make reserved characters readable or transport-safe.",
    useCases: [
      "Encode spaces, ampersands, and symbols inside query parameters.",
      "Decode percent-encoded URLs copied from logs or browser requests.",
      "Debug redirect URLs and callback parameters.",
    ],
    tips: [
      "Encode only the URL component you are inserting, not always the entire URL.",
      "Decode suspicious redirect parameters before trusting where they send users.",
    ],
    faq: defaultFaq("the URL encoder and decoder"),
  },
  "json-to-csv": {
    summary:
      "Convert JSON arrays and objects into CSV text for spreadsheets, reporting, and quick data handoffs. The converter is built for common API-shaped JSON.",
    useCases: [
      "Turn an API response into a spreadsheet-ready CSV file.",
      "Extract object keys into columns for analysis.",
      "Prepare sample data for non-developer teammates.",
    ],
    tips: [
      "Flat arrays of objects create the cleanest CSV output.",
      "Normalize nested data before converting when every nested field needs its own column.",
    ],
    faq: defaultFaq("the JSON to CSV converter"),
  },
  "yaml-converter": {
    summary:
      "Convert YAML to JSON and JSON to YAML for configuration, infrastructure files, docs, and API examples. It is useful when moving between human-friendly and machine-friendly formats.",
    useCases: [
      "Convert Kubernetes, CI, or app config snippets into JSON.",
      "Turn JSON examples into cleaner YAML for documentation.",
      "Check whether YAML indentation parses into the expected data shape.",
    ],
    tips: [
      "Indentation matters in YAML; validate after every manual edit.",
      "Quote strings that look like booleans, dates, or numbers when the exact value matters.",
    ],
    faq: defaultFaq("the YAML and JSON converter"),
  },
  "xml-formatter": {
    summary:
      "Format XML into readable, indented markup for feeds, SOAP payloads, SVG, Android resources, and legacy integrations.",
    useCases: [
      "Beautify compact XML from third-party APIs.",
      "Inspect nested tags and attributes without a desktop XML editor.",
      "Clean up XML examples before sharing them in tickets or docs.",
    ],
    tips: [
      "Formatting improves readability but does not make invalid XML valid.",
      "Be careful with whitespace-sensitive XML content when copying formatted output.",
    ],
    faq: defaultFaq("the XML formatter"),
  },
  "hash-generator": {
    summary:
      "Generate common hashes such as MD5, SHA-1, SHA-256, and SHA-512 from local text. It is useful for checksums, debugging, comparisons, and documentation.",
    useCases: [
      "Compare text or file content fingerprints during debugging.",
      "Generate sample hashes for tests and technical docs.",
      "Verify that two pasted strings produce the same digest.",
    ],
    tips: [
      "Use SHA-256 or SHA-512 for modern integrity checks.",
      "Do not use plain hashes for password storage; use a dedicated password hashing algorithm.",
    ],
    faq: defaultFaq("the hash generator"),
  },
  "password-generator": {
    summary:
      "Create strong random passwords locally with configurable length and character sets. It helps avoid weak, reused, or predictable credentials.",
    useCases: [
      "Generate passwords for test accounts, admin panels, and throwaway credentials.",
      "Create longer passphrases when a service supports them.",
      "Avoid copying sensitive passwords through remote services.",
    ],
    tips: [
      "Use a password manager to store generated passwords safely.",
      "Prefer longer passwords over short passwords with only complex symbols.",
    ],
    faq: defaultFaq("the password generator"),
  },
  "timestamp-converter": {
    summary:
      "Convert Unix timestamps to human-readable dates and convert dates back to epoch time. It is useful for logs, JWT claims, database rows, and scheduled systems.",
    useCases: [
      "Read expiry times such as JWT exp and iat claims.",
      "Convert log timestamps while debugging incidents.",
      "Create epoch values for database tests and API payloads.",
    ],
    tips: [
      "Check whether your source timestamp is in seconds or milliseconds.",
      "Always confirm timezone assumptions when comparing timestamps from different systems.",
    ],
    faq: defaultFaq("the Unix timestamp converter"),
  },
  "uuid-generator": {
    summary:
      "Generate random UUID v4 identifiers for databases, fixtures, mocks, and distributed systems where unique IDs are needed quickly.",
    useCases: [
      "Create IDs for test records and sample API payloads.",
      "Generate request IDs, correlation IDs, and mock entity IDs.",
      "Copy multiple UUIDs for fixtures or seed data.",
    ],
    tips: [
      "Use UUID v4 when you need random, globally unique identifiers.",
      "Use sortable ID formats separately when chronological ordering is required.",
    ],
    faq: defaultFaq("the UUID generator"),
  },
  "markdown-editor": {
    summary:
      "Write Markdown and preview the rendered output side by side. It is useful for README files, issue descriptions, docs, and GitHub-flavored Markdown drafts.",
    useCases: [
      "Preview headings, lists, tables, links, and code blocks.",
      "Draft documentation before committing it to a repository.",
      "Check how Markdown content reads on small screens.",
    ],
    tips: [
      "Keep headings hierarchical so readers and assistive technology can scan the document.",
      "Use fenced code blocks with language names for clearer technical examples.",
    ],
    faq: defaultFaq("the Markdown editor"),
  },
  "html-preview": {
    summary:
      "Preview HTML, CSS, and simple JavaScript in a sandboxed iframe. It is useful for testing snippets, email-style markup, and quick layout experiments.",
    useCases: [
      "Test small HTML examples without creating a local project.",
      "Preview CSS changes before adding them to an app.",
      "Share reproducible markup snippets during debugging.",
    ],
    tips: [
      "Keep experiments isolated from production secrets and authenticated sessions.",
      "Use semantic HTML in snippets so the preview stays accessible.",
    ],
    faq: defaultFaq("the HTML preview tool"),
  },
  "regex-tester": {
    summary:
      "Test JavaScript regular expressions against sample text and inspect matches quickly. It helps with validation, search patterns, parsing, and log analysis.",
    useCases: [
      "Debug capture groups before shipping validation logic.",
      "Test search patterns against realistic sample text.",
      "Check whether a regex is too broad or too strict.",
    ],
    tips: [
      "Start with a small sample, then test edge cases and invalid input.",
      "Avoid overly complex patterns when simple string parsing is safer.",
    ],
    faq: defaultFaq("the regex tester"),
  },
  "css-gradient": {
    summary:
      "Design CSS gradients visually and copy the final CSS. It helps with backgrounds, buttons, badges, charts, and design system experiments.",
    useCases: [
      "Create linear or radial gradients for UI prototypes.",
      "Tune color stops before moving CSS into a stylesheet.",
      "Generate reusable snippets for docs and demos.",
    ],
    tips: [
      "Check contrast when text sits on top of a gradient.",
      "Limit decorative gradients on operational interfaces where readability matters most.",
    ],
    faq: defaultFaq("the CSS gradient generator"),
  },
  "color-converter": {
    summary:
      "Convert colors between HEX, RGB, and HSL while previewing the result. It is useful for CSS, design tokens, accessibility checks, and visual QA.",
    useCases: [
      "Translate designer-provided colors into CSS-friendly formats.",
      "Inspect RGB and HSL values for existing HEX colors.",
      "Create consistent color values for docs and components.",
    ],
    tips: [
      "Use HSL when you need predictable lightness or saturation adjustments.",
      "Test foreground and background contrast before shipping UI colors.",
    ],
    faq: defaultFaq("the color converter"),
  },
  "jwt-decoder": {
    summary:
      "Decode JSON Web Tokens locally to inspect the header, payload, expiry, issuer, subject, and other claims. It is built for debugging authentication flows without uploading tokens.",
    useCases: [
      "Inspect exp, iat, aud, iss, and sub claims during auth debugging.",
      "Confirm whether a token is expired or using the expected algorithm.",
      "Read token payloads in test and staging environments.",
    ],
    tips: [
      "Decoding a JWT does not verify trust by itself; validate signatures on the server.",
      "Treat real access tokens as secrets even when using a local decoder.",
    ],
    faq: defaultFaq("the JWT decoder"),
  },
  "sql-formatter": {
    summary:
      "Format SQL queries into readable, consistently indented code. It is useful for reviews, debugging, docs, dashboards, and long queries copied from logs.",
    useCases: [
      "Beautify SELECT, JOIN, WHERE, GROUP BY, and CTE-heavy queries.",
      "Clean SQL before pasting it into code review or documentation.",
      "Make database logs easier to read during debugging.",
    ],
    tips: [
      "Format SQL before optimizing so joins and filters are easier to reason about.",
      "Keep aliases descriptive when queries are shared with other engineers.",
    ],
    faq: defaultFaq("the SQL formatter"),
  },
  "diff-checker": {
    summary:
      "Compare two blocks of text and highlight changes. It is useful for code snippets, config files, logs, generated output, and documentation revisions.",
    useCases: [
      "Compare before-and-after config snippets.",
      "Find small changes in generated JSON, SQL, XML, or text.",
      "Review copied content without opening a full Git diff.",
    ],
    tips: [
      "Normalize formatting first when you only care about content changes.",
      "Use a version control diff for repository changes that need history and review context.",
    ],
    faq: defaultFaq("the text diff checker"),
  },
  "cron-parser": {
    summary:
      "Validate cron expressions and translate schedules into readable language. It helps confirm when jobs, automations, and recurring tasks will actually run.",
    useCases: [
      "Check cron expressions before deploying scheduled jobs.",
      "Explain a schedule in plain language for teammates.",
      "Debug unexpected run times caused by day, month, or timezone assumptions.",
    ],
    tips: [
      "Confirm whether your scheduler uses five-field or six-field cron syntax.",
      "Always verify timezone behavior in the platform that runs the job.",
    ],
    faq: defaultFaq("the cron parser"),
  },
  "ip-lookup": {
    summary:
      "Look up public IP address details such as approximate location, ISP, and network information. It is useful for support, security triage, and network debugging.",
    useCases: [
      "Check the public IP information seen by external services.",
      "Debug region, ISP, or ASN-related behavior.",
      "Collect high-level network context for support tickets.",
    ],
    tips: [
      "IP geolocation is approximate and can be affected by VPNs, proxies, and mobile networks.",
      "Do not use IP lookup results as the only factor for security decisions.",
    ],
    faq: defaultFaq("the IP address lookup tool"),
  },
};
