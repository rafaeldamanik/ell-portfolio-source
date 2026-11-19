"use client"

import { useCallback, useMemo, useState } from "react"

/**
 * Modal state for a list of projects: open / close / step through.
 * The list passed in defines the prev/next order (Home uses its
 * featured list, Works uses the currently filtered list).
 */
export default function useProjectModal(list) {
  const [activeId, setActiveId] = useState(null)

  const activeIndex = useMemo(
    () => list.findIndex((p) => p.id === activeId),
    [list, activeId]
  )
  const activeProject = activeIndex >= 0 ? list[activeIndex] : null

  const openProject = useCallback((id) => setActiveId(id), [])
  const closeProject = useCallback(() => setActiveId(null), [])

  const stepProject = useCallback(
    (dir) => {
      setActiveId((prev) => {
        const i = list.findIndex((p) => p.id === prev)
        if (i < 0) return prev
        return list[(i + dir + list.length) % list.length].id
      })
    },
    [list]
  )

  return { activeProject, activeIndex, openProject, closeProject, stepProject }
}
