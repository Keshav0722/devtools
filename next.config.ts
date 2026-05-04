import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/tools/base64-encode-decode",
        destination: "/tools/base64",
        permanent: true,
      },
      {
        source: "/tools/url-encoder-decoder",
        destination: "/tools/url-encode",
        permanent: true,
      },
      {
        source: "/tools/timestamp-converter",
        destination: "/tools/timestamp",
        permanent: true,
      },
      {
        source: "/tools/uuid-generator",
        destination: "/tools/uuid",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
