import type { NextConfig } from "next";

/**
 * Static HTML export (no Node server).
 * Locale redirect `/` → `/en` is handled by `public/_redirects`.
 */
const nextConfig: NextConfig = {
  output: "export",
  // next dev must not write instruction files into the repo.
  agentRules: false,
  images: {
    // next/image optimizer needs a server; static hosting serves files as-is.
    unoptimized: true,
  },
  experimental: {
    // Root layout is under [locale], so unmatched URLs need a full-document 404.
    globalNotFound: true,
  },
};

export default nextConfig;
