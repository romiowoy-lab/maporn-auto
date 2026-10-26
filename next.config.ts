import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old "สาขามีนบุรี" entry duplicated Suzy Fix Minburi; keep old links working.
      { source: "/branches/minburi", destination: "/branches/suzy-fix", permanent: true },
    ];
  },
};

export default nextConfig;
