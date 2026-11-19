"use client"

import { useEffect } from "react"

/**
 * Client-side document title / meta description per "page".
 * Keeps SEO tags in sync with the current route of the SPA.
 */
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute("content", description)
    }
  }, [title, description])
}
