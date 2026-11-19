"use client"

import { useEffect, useRef } from "react"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import { Close } from "@/components/Icons"
import { pad } from "@/utils"

/**
 * Project detail modal (accessible dialog):
 * - Escape key closes
 * - click on the backdrop closes
 * - focus is trapped inside and restored on close
 * - body scroll locks while open and is always restored afterwards
 * - ArrowLeft / ArrowRight or the footer buttons step through projects
 */
export default function ProjectModal({ project, list, onClose, onStep }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const lastFocus = useRef(null)
  const open = Boolean(project)

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return undefined

    lastFocus.current = document.activeElement
    const raf = requestAnimationFrame(() => closeRef.current?.focus())

    const isFocusable = (el) =>
      el &&
      el.offsetParent !== null &&
      !el.matches('[tabindex="-1"]') &&
      !el.matches("video:not([controls])")

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === "ArrowRight") onStep(1)
      if (e.key === "ArrowLeft") onStep(-1)
      if (e.key === "Tab") {
        const nodes = Array.from(
          panelRef.current?.querySelectorAll(
            'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
          ) || []
        ).filter(isFocusable)
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown, true)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", onKeyDown, true)
      // Restore focus to the element that opened the modal
      if (lastFocus.current && typeof lastFocus.current.focus === "function") {
        lastFocus.current.focus()
      }
    }
  }, [open, onClose, onStep])

  if (!open) return null

  // Position within the currently displayed list, not the global order
  const positionInList = list.findIndex((p) => p.id === project.id)

  return (
    <div className="mod" role="dialog" aria-modal="true" aria-labelledby="ell-modal-title">
      <div className="mod__backdrop" onClick={onClose} aria-hidden="true" />

      <div className="mod__panel" ref={panelRef}>
        <div className="mod__head">
          <span className="label">
            {project.categoryLabel} — {project.year}
          </span>
          <button
            type="button"
            ref={closeRef}
            className="mod__close"
            onClick={onClose}
            aria-label="Close project details"
            data-cursor-label="Close"
          >
            <Close />
          </button>
        </div>

        <div className="mod__media">
          {project.video ? (
            <video
              src={project.video.src}
              poster={project.video.poster || project.cover}
              controls
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img src={project.cover} alt={project.coverAlt} decoding="async" />
          )}
        </div>

        <div className="mod__body">
          <div>
            <p className="label label--muted">
              {pad(positionInList + 1)} / {pad(list.length)}
            </p>
            <h2 id="ell-modal-title" className="mod__title">
              {project.title}
            </h2>
            <p className="mod__desc">{project.description}</p>
            {project.isPlaceholder && (
              <p className="mod__note">
                Placeholder sample for layout testing — not a client work. Replace it
                via src/data/projects.json.
              </p>
            )}
          </div>

          <div>
            <dl className="mod__facts">
              <div className="mod__fact">
                <dt className="label">Category</dt>
                <dd>{project.categoryLabel}</dd>
              </div>
              <div className="mod__fact">
                <dt className="label">Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="mod__fact">
                <dt className="label">Tools</dt>
                <dd className="mod__tools">
                  {project.tools.map((tool) => (
                    <span className="mod__tool" key={tool}>
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mod__nav">
          <button type="button" className="mod__navbtn" onClick={() => onStep(-1)}>
            ← Prev Project
          </button>
          <button type="button" className="mod__navbtn" onClick={() => onStep(1)}>
            Next Project →
          </button>
        </div>
      </div>
    </div>
  )
}
