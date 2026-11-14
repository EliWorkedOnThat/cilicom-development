import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // The static Eztemplate site must stay at /eztemplate/ because its pages link to style.css with relative paths.
  // proxy.ts takes over the trailing-slash redirects for the rest of the site.
  skipTrailingSlashRedirect: true,
  // app/robots.txt has Albanian text in its comments; without a charset, browsers can show it garbled
  async headers() {
    return [{ source: "/robots.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] }];
  },
  async rewrites() {
    return [{ source: "/eztemplate/", destination: "/eztemplate/index.html" }];
  },
  partialPrefetching: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
