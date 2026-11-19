"use client"

import { useEffect, useState } from "react"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"

/**
 * Branded loading screen. Brief by design: ~1.1s on first load,
 * shorter for returning sessions and instantly reduced when the
 * visitor prefers reduced motion.
 */
export default function LoadingScreen() {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState("boot") // boot -> done -> gone

  useEffect(() => {
    const base = reduced ? 200 : sessionStorage.getItem("ell-loaded") ? 450 : 1100
    sessionStorage.setItem("ell-loaded", "1")
    const t1 = setTimeout(() => setPhase("done"), base)
    const t2 = setTimeout(() => setPhase("gone"), base + 550)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduced])

  if (phase === "gone") return null

  return (
    <div
      className={`loading${phase === "done" ? " is-done" : ""}`}
      role="status"
      aria-label="Loading the portfolio"
    >
      <p className="loading__mark">
        ell<span className="dot">.</span>
      </p>
      <div className="loading__bar" aria-hidden="true">
        <i />
      </div>
    </div>
  )
}
