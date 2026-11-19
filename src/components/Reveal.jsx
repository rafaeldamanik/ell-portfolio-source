"use client"

import useReveal from "@/hooks/useReveal"

/**
 * Scroll-reveal wrapper. Adds `is-visible` when the element enters
 * the viewport. Purely presentational — without JS the content is
 * fully visible.
 *
 * <Reveal as="p" delay={120}>...</Reveal>
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  variant,
  className,
  children,
  ...rest
}) {
  const ref = useReveal()

  return (
    <Tag
      ref={ref}
      data-reveal={variant || "up"}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
