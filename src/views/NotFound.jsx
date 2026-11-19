"use client"

import { Link } from "react-router-dom"
import Reveal from "@/components/Reveal"
import useDocumentMeta from "@/hooks/useDocumentMeta"

/** 404 — consistent with the ell. visual identity. */
export default function NotFound() {
  useDocumentMeta("Page Not Found — ell.")

  return (
    <section className="nf">
      <div className="container">
        <Reveal as="p" className="nf__code">
          404<span className="dot">.</span>
        </Reveal>
        <Reveal as="h1" className="nf__title" delay={100}>
          This page drifted off the grid.
        </Reveal>
        <Reveal as="p" className="nf__text" delay={180}>
          The page you are looking for does not exist or has moved. Let&apos;s
          get you back to the good part.
        </Reveal>
        <Reveal as="div" className="nf__actions" delay={240}>
          <Link to="/" className="btn btn--solid">
            Back Home
          </Link>
          <Link to="/works" className="tlink">
            View Works
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
