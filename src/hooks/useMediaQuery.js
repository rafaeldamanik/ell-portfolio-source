"use client"

import { useCallback, useSyncExternalStore } from "react"

/**
 * Reactive media query hook, hydration-safe:
 * server snapshot is always false, so SSR output never depends on
 * the viewport. Based on the official React docs pattern.
 */
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}
