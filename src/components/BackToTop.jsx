"use client"

import useScrollY from "@/hooks/useScrollY"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import { ArrowUp } from "@/components/Icons"
import { cx } from "@/utils"

/** Appears after the visitor scrolls; smooth-scrolls back to the top. */
export default function BackToTop() {
  const y = useScrollY()
  const reduced = usePrefersReducedMotion()
  const shown = y > 700

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <button
      type="button"
      className={cx("float-top", shown && "is-shown")}
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      data-cursor-label="Top"
    >
      <ArrowUp size={18} />
    </button>
  )
}
