"use client"

import { useSyncExternalStore } from "react"
import useMediaQuery from "@/hooks/useMediaQuery"

/** True when the visitor prefers reduced motion. */
export default function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)")
}
