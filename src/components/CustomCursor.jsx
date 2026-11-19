"use client"

import { useEffect, useRef } from "react"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import useMediaQuery from "@/hooks/useMediaQuery"

/**
 * Minimal custom cursor: a blue dot + a lagging ring.
 * - Only enabled on devices with a fine pointer and hover support.
 * - Touch devices keep the native cursor untouched.
 * - With prefers-reduced-motion the ring follows instantly (no lag).
 * - Elements with data-cursor-label="View" turn the ring into a badge.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery("(pointer: fine)")
  const canHover = useMediaQuery("(hover: hover)")
  const enabled = finePointer && canHover

  useEffect(() => {
    if (!enabled) return undefined

    document.documentElement.classList.add("has-cursor")

    const dot = dotRef.current
    const ring = ringRef.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }

    const loop = () => {
      const k = reduced ? 1 : 0.18
      rx += (x - rx) * k
      ry += (y - ry) * k
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const labelled = e.target.closest?.("[data-cursor-label]")
      const interactive = e.target.closest?.(
        'a, button, [role="button"], input, textarea, select, label, video'
      )
      if (labelled) {
        ring.classList.add("is-label")
        ring.classList.remove("is-hover")
        if (labelRef.current) labelRef.current.textContent = labelled.dataset.cursorLabel
      } else if (interactive) {
        ring.classList.add("is-hover")
        ring.classList.remove("is-label")
      } else {
        ring.classList.remove("is-hover", "is-label")
      }
    }

    const hide = () => {
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    const show = () => {
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", hide)
    document.documentElement.addEventListener("mouseenter", show)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.documentElement.removeEventListener("mouseleave", hide)
      document.documentElement.removeEventListener("mouseenter", show)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [enabled, reduced])

  if (!enabled) return null

  return (
    <>
      <div id="ell-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="ell-cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-label" ref={labelRef} />
      </div>
    </>
  )
}
