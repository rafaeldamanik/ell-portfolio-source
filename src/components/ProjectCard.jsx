"use client"

import { useRef } from "react"
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion"
import { Play } from "@/components/Icons"
import { cx, pad } from "@/utils"

/**
 * Editorial project card.
 * - image projects: <img> with lazy loading
 * - video projects: thumbnail poster + muted hover preview on desktop,
 *   thumbnail only on touch devices; video never autoplays with sound.
 */
export default function ProjectCard({ project, index, ratio, onOpen }) {
  const videoRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const hasVideo = Boolean(project.video)

  const handleEnter = () => {
    if (!hasVideo || reduced) return
    videoRef.current?.play().catch(() => {})
  }

  const handleLeave = () => {
    if (!hasVideo) return
    const v = videoRef.current
    if (v && !v.paused) v.pause()
  }

  return (
    <button
      type="button"
      className="pcard"
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      data-cursor-label="View"
      aria-haspopup="dialog"
      aria-label={`Open project details: ${project.title}`}
    >
      <span className="pcard__media" style={{ aspectRatio: ratio || project.ratio }}>
        {hasVideo ? (
          <video
            ref={videoRef}
            src={project.video.src}
            poster={project.video.poster || project.cover}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
          />
        ) : (
          <img
            src={project.cover}
            alt={project.coverAlt}
            loading="lazy"
            decoding="async"
          />
        )}

        <span className={cx("pcard__tag", hasVideo && "pcard__tag--video")}>
          {hasVideo ? "Video" : project.categoryLabel}
        </span>

        {hasVideo && (
          <span className="pcard__play" aria-hidden="true">
            <Play />
          </span>
        )}
      </span>

      <span className="pcard__meta">
        <span className="pcard__title">
          <span className="pcard__idx" aria-hidden="true">
            {pad(index)}
          </span>
          {project.title}
        </span>
        <span className="pcard__cat">
          {project.categoryLabel} · {project.year}
        </span>
      </span>
    </button>
  )
}
