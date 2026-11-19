import type { NextConfig } from "next"

/**
 * Dev / sandbox: standalone output (unchanged default).
 * GitHub Pages: run `npm run build:static` — it sets NEXT_EXPORT=1 and
 * produces a fully static `out/` folder. Optionally set NEXT_BASE_PATH
 * (e.g. /ell) when deploying to a project site sub-path.
 */
const isExport = process.env.NEXT_EXPORT === "1"
const basePath = process.env.NEXT_BASE_PATH || ""

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const } : { output: "standalone" as const }),
  ...(basePath ? { basePath } : {}),
  // Allow a separate build directory so an export build never touches
  // the running dev server's cache.
  distDir: process.env.NEXT_DIST || ".next",
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
}

export default nextConfig
