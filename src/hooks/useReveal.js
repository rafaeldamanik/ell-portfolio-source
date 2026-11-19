"use client"

import { useEffect, useRef } from "react"

/**
 * Attaches an IntersectionObserver and adds `is-visible` once the
 * element enters the viewport. Pair with the [data-reveal] styles
 * in global.css. Content stays visible if JS never runs.
 */
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible")
      return undefined
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
