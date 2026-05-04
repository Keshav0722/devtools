export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  relatedToolIds: string[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-format-json-in-python-js-online",
    title: "How to Format JSON in Python, JavaScript, and Online",
    description:
      "A practical guide to formatting, validating, minifying, and debugging JSON in browser tools, Python, and JavaScript.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "7 min read",
    tags: ["JSON", "APIs", "Debugging"],
    relatedToolIds: ["json-formatter", "json-to-csv", "diff-checker"],
    sections: [
      {
        heading: "When JSON formatting matters",
        body: [
          "JSON is easy to read when it is indented and almost impossible to scan when it is compressed into one line. Formatting helps you inspect API responses, config files, webhook payloads, and logs before they become production problems.",
          "A formatter should do two jobs: make valid JSON readable and tell you clearly when the input is invalid. If the tool hides errors, it can make broken data look trustworthy.",
        ],
      },
      {
        heading: "Format JSON online",
        body: [
          "For quick inspection, paste the payload into a local-first JSON formatter. The safest tools process input in the browser so tokens, customer data, and private config values are not uploaded to a remote server.",
          "After formatting, check nested objects, arrays, booleans, null values, and escaped strings. These are the areas where API bugs often hide.",
        ],
      },
      {
        heading: "Format JSON in JavaScript",
        body: [
          "In JavaScript, parse the string with JSON.parse and render it with JSON.stringify(value, null, 2). The third argument controls indentation, and two spaces is a common default for readable examples.",
          "Wrap parsing in try/catch when handling user-provided input. Invalid JSON should produce a helpful error instead of crashing the page or script.",
        ],
      },
      {
        heading: "Format JSON in Python",
        body: [
          "In Python, use the json module: json.loads to parse a string and json.dumps(data, indent=2) to print formatted JSON. Use sort_keys=True only when stable alphabetical output is more important than preserving original key order.",
          "For command-line workflows, python -m json.tool can validate and format JSON from a file or pipe.",
        ],
      },
    ],
  },
  {
    slug: "jwt-vs-session-tokens-when-to-use-which",
    title: "JWT vs Session Tokens: When to Use Which",
    description:
      "Understand the tradeoffs between JWTs and session tokens, including storage, revocation, expiry, and debugging.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "8 min read",
    tags: ["JWT", "Authentication", "Security"],
    relatedToolIds: ["jwt-decoder", "timestamp-converter", "base64-encode-decode"],
    sections: [
      {
        heading: "The short version",
        body: [
          "JWTs are self-contained tokens that carry claims such as issuer, audience, subject, expiry, and permissions. Session tokens are usually opaque identifiers that point to server-side session state.",
          "Use JWTs when stateless verification and cross-service portability matter. Use sessions when server-side revocation, short feedback loops, and centralized control matter more.",
        ],
      },
      {
        heading: "JWT strengths and risks",
        body: [
          "JWTs are convenient for distributed systems because services can validate signed claims without querying a central session store on every request.",
          "The risk is that a stolen JWT can remain valid until it expires unless you add revocation lists, short expiry, token rotation, or additional server-side checks.",
        ],
      },
      {
        heading: "Session token strengths and risks",
        body: [
          "Session tokens keep most sensitive state on the server. That makes logout, revocation, and permission changes easier to enforce immediately.",
          "The tradeoff is infrastructure: your app needs a reliable session store and careful scaling behavior across regions or services.",
        ],
      },
      {
        heading: "How to debug tokens safely",
        body: [
          "Decode JWTs locally to inspect the header and payload, but remember that decoding is not verification. A server must validate the signature, issuer, audience, algorithm, and expiry before trusting claims.",
          "Treat real tokens as secrets. Avoid pasting production access tokens into remote tools or screenshots.",
        ],
      },
    ],
  },
  {
    slug: "regex-cheatsheet-2026",
    title: "Regex Cheatsheet: Patterns Every Developer Should Know",
    description:
      "A concise regex guide for anchors, groups, quantifiers, flags, escaping, validation, and safer pattern testing.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "6 min read",
    tags: ["Regex", "Validation", "Text"],
    relatedToolIds: ["regex-tester", "diff-checker", "url-encoder-decoder"],
    sections: [
      {
        heading: "Core building blocks",
        body: [
          "Anchors such as ^ and $ let you match the start and end of a string. Character classes such as [a-z] match one character from a range. Groups capture parts of a match for reuse or extraction.",
          "Quantifiers decide how often something can appear: * means zero or more, + means one or more, ? means optional, and {2,5} means a bounded range.",
        ],
      },
      {
        heading: "Validation patterns",
        body: [
          "For validation, anchor the full pattern so partial matches do not pass accidentally. For example, an email-like check should match the whole input, not any email-shaped substring inside it.",
          "Keep validation regex practical. Some formats, especially email addresses and URLs, are complex enough that a parser or platform validation API can be safer.",
        ],
      },
      {
        heading: "Debugging strategy",
        body: [
          "Test with valid examples, invalid examples, edge cases, empty strings, and very long input. A pattern that works for the happy path can still fail badly in production.",
          "When a regex becomes hard to explain, split the problem into smaller parsing steps or add comments in code near the pattern.",
        ],
      },
    ],
  },
  {
    slug: "complete-guide-to-base64-encoding-decoding",
    title: "Complete Guide to Base64 Encoding and Decoding",
    description:
      "Learn what Base64 is, when to use it, why it is not encryption, and how to encode or decode data safely.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "6 min read",
    tags: ["Base64", "Encoding", "APIs"],
    relatedToolIds: ["base64-encode-decode", "url-encoder-decoder", "jwt-decoder"],
    sections: [
      {
        heading: "What Base64 does",
        body: [
          "Base64 converts binary data into an ASCII string that is easier to move through systems that expect text. It is common in data URLs, email, API examples, and some authorization headers.",
          "Encoding changes representation, not secrecy. Anyone can decode Base64 if they have the string.",
        ],
      },
      {
        heading: "When to encode",
        body: [
          "Use Base64 when a system needs text-safe data but the original value may contain bytes or characters that are not transport-friendly.",
          "Avoid Base64 when plain text, JSON, or URL encoding is the correct format. Unnecessary encoding makes systems harder to debug.",
        ],
      },
      {
        heading: "Common mistakes",
        body: [
          "Do not store passwords as Base64. Use a password hashing algorithm designed for credential storage.",
          "If decoding produces unreadable output, the source may be binary data or may use a different character encoding.",
        ],
      },
    ],
  },
  {
    slug: "sql-formatting-best-practices",
    title: "SQL Formatting Best Practices for Readable Queries",
    description:
      "Make SQL queries easier to debug, review, and optimize with consistent formatting, aliases, indentation, and clause structure.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "7 min read",
    tags: ["SQL", "Databases", "Code Review"],
    relatedToolIds: ["sql-formatter", "diff-checker", "json-formatter"],
    sections: [
      {
        heading: "Why formatting changes query quality",
        body: [
          "SQL is read more often than it is written. Clear formatting makes joins, filters, grouping, and ordering easier to inspect during code review or incident debugging.",
          "Good formatting does not make a query faster by itself, but it makes performance problems easier to see.",
        ],
      },
      {
        heading: "Useful conventions",
        body: [
          "Put major clauses such as SELECT, FROM, JOIN, WHERE, GROUP BY, HAVING, and ORDER BY on separate lines. Align related conditions when a query has many filters.",
          "Use descriptive aliases. Short aliases are fine for small queries, but unclear one-letter aliases become expensive in complex reports.",
        ],
      },
      {
        heading: "Review workflow",
        body: [
          "Format a query before reviewing it, then check whether each join has a reason, each filter belongs in the correct clause, and each selected column is needed.",
          "For generated SQL, compare formatted versions before and after a change to reveal subtle differences.",
        ],
      },
    ],
  },
  {
    slug: "generate-cryptographically-secure-passwords",
    title: "How to Generate Cryptographically Secure Passwords",
    description:
      "Practical password generation guidance covering randomness, length, character sets, password managers, and local generation.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "6 min read",
    tags: ["Security", "Passwords", "Privacy"],
    relatedToolIds: ["password-generator", "hash-generator", "uuid-generator"],
    sections: [
      {
        heading: "Length beats cleverness",
        body: [
          "A longer random password is usually stronger and easier to manage than a short password packed with symbols. Length increases the search space dramatically.",
          "Use a password manager so generated passwords can be unique for every service instead of reused from memory.",
        ],
      },
      {
        heading: "Randomness matters",
        body: [
          "Secure generators should use browser cryptography APIs or platform-grade randomness, not predictable math random functions.",
          "Avoid patterns, dictionary substitutions, keyboard walks, names, dates, and reused fragments from old passwords.",
        ],
      },
      {
        heading: "Safe workflow",
        body: [
          "Generate passwords locally when possible, store them in a trusted password manager, and enable multi-factor authentication for important accounts.",
          "Rotate passwords after suspected exposure, but do not rely on frequent forced rotation as a substitute for unique strong credentials.",
        ],
      },
    ],
  },
  {
    slug: "timestamp-conversion-in-javascript",
    title: "Timestamp Conversion in JavaScript: Unix, ISO, and Local Time",
    description:
      "Understand seconds vs milliseconds, ISO dates, local time, UTC, and how to debug timestamp values in JavaScript.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "6 min read",
    tags: ["JavaScript", "Time", "Debugging"],
    relatedToolIds: ["timestamp-converter", "jwt-decoder", "cron-parser"],
    sections: [
      {
        heading: "Seconds vs milliseconds",
        body: [
          "Unix timestamps are often stored in seconds, while JavaScript Date expects milliseconds. Mixing the two is one of the most common timestamp bugs.",
          "If a converted date lands in 1970 or far in the future, check whether the timestamp needs to be multiplied or divided by 1000.",
        ],
      },
      {
        heading: "UTC and local display",
        body: [
          "A timestamp represents a point in time. The displayed date can change depending on timezone, locale, and formatting options.",
          "When debugging distributed systems, compare UTC first, then translate into local time for human communication.",
        ],
      },
      {
        heading: "JWT and logs",
        body: [
          "JWT exp and iat claims are numeric date values measured in seconds since the Unix epoch.",
          "Logs may use Unix, ISO 8601, or platform-specific formats. Convert them consistently before comparing events.",
        ],
      },
    ],
  },
  {
    slug: "top-10-free-online-developer-tools",
    title: "Top Free Online Developer Tools for Daily Engineering Work",
    description:
      "A practical list of browser-based tools for JSON, JWT, regex, SQL, hashes, UUIDs, timestamps, Base64, and text diffs.",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    readingTime: "7 min read",
    tags: ["Developer Tools", "Productivity", "Privacy"],
    relatedToolIds: ["json-formatter", "jwt-decoder", "regex-tester", "sql-formatter"],
    sections: [
      {
        heading: "What makes a good online dev tool",
        body: [
          "The best developer utilities are fast, focused, private, and predictable. You should be able to paste input, get output instantly, and leave without creating an account.",
          "For sensitive inputs like JWTs, API payloads, and config files, browser-based processing is a major advantage because your data stays on your machine.",
        ],
      },
      {
        heading: "Core tools worth bookmarking",
        body: [
          "A strong everyday toolkit includes a JSON formatter, JWT decoder, regex tester, Base64 encoder, URL encoder, SQL formatter, hash generator, UUID generator, timestamp converter, and diff checker.",
          "These cover the most common debugging loops: reading data, transforming data, validating input, comparing output, and generating safe test values.",
        ],
      },
      {
        heading: "How to choose safely",
        body: [
          "Prefer tools that explain whether input is processed locally. Avoid pasting secrets into pages that send data to a server unless you fully trust the operator and understand the privacy policy.",
          "For production security decisions, use online tools for inspection and learning, then verify behavior in your application and server-side code.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
