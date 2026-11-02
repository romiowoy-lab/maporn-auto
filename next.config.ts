import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old "สาขามีนบุรี" entry duplicated Suzy Fix Minburi; keep old links working.
      { source: "/branches/minburi", destination: "/branches/suzy-fix", permanent: true },
      // /blog is now the canonical article path; /news redirects there permanently.
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/news/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
