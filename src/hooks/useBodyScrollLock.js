"use client"

import { useEffect } from "react"

/**
 * Locks body scroll while `locked` is true, compensating for the
 * scrollbar width so the page does not jump. Always restores the
 * previous state — scroll is never locked permanently.
 */
export default function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = "hidden"
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [locked])
}
