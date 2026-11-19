"use client"

import { Link } from "react-router-dom"
import { profile } from "@/data/profile"
import Reveal from "@/components/Reveal"
import { ArrowUpRight } from "@/components/Icons"

/**
 * Full-screen editorial hero: oversized typography, asymmetric
 * composition with the portrait, CTA and scroll indicator.
 */
export default function Hero() {
  const scrollToIntro = () => {
    const el = document.getElementById("intro")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="hero" aria-labelledby="ell-hero-title">
      <div className="container hero__inner">
        <div className="hero__meta label">
          <span>Portfolio © {new Date().getFullYear()}</span>
          <span>Rafael Damanik</span>
          <span>Based in {profile.location}</span>
        </div>

        <div className="hero__stage">
          <h1 id="ell-hero-title" className="hero__title">
            <Reveal as="span" className="hero__line">
              Graphic
            </Reveal>
            <Reveal as="span" className="hero__line" delay={110}>
              Designer <span className="hero__amp">&amp;</span>
            </Reveal>
            <Reveal as="span" className="hero__line" delay={220}>
              Video Editor
            </Reveal>
          </h1>

          <Reveal as="figure" className="hero__figure" variant="fade" delay={320}>
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              width={960}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              <span>{profile.name}</span>
              <span>ell.</span>
            </figcaption>
          </Reveal>

          <div className="hero__row">
            <Reveal as="p" className="hero__desc" delay={420}>
              {profile.heroIntro}
            </Reveal>
            <Reveal as="div" className="hero__actions" delay={500}>
              <Link to="/contact" className="btn btn--solid">
                Start a Project <ArrowUpRight />
              </Link>
              <Link to="/works" className="tlink">
                View Works
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="hero__scroll">
          <button
            type="button"
            className="hero__scrollbtn"
            onClick={scrollToIntro}
            aria-label="Scroll to the introduction"
          >
            <i aria-hidden="true" />
            Scroll to explore
          </button>
          <span className="hero__scrollmeta label label--muted">
            Design — Social — Video — Photo
          </span>
        </div>
      </div>
    </section>
  )
}
