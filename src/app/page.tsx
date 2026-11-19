"use client"

import dynamic from "next/dynamic"

/**
 * The portfolio SPA is browser-only (hash router, window APIs),
 * so it is loaded client-side. The fallback shows the branded shell
 * until the app chunk arrives.
 */
const PortfolioApp = dynamic(() => import("@/components/App"), {
  ssr: false,
  loading: () => <div className="app-shell" aria-hidden="true">ell.</div>,
})

export default function Page() {
  return <PortfolioApp />
}
