"use client"

import { Link } from "react-router-dom"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"

/** Short introduction with an oversized editorial statement. */
export default function Intro() {
  return (
    <section className="section intro" id="intro" aria-labelledby="ell-intro-title">
      <div className="container intro__grid">
        <SectionHeading index="01" label="Introduction" />

        <Reveal as="h2" className="intro__statement" id="ell-intro-title">
          Design that says it once — <em>clearly, confidently.</em>
        </Reveal>

        <Reveal as="p" className="intro__body" delay={120}>
          ell. is the personal studio name of Rafael Damanik, an independent
          graphic designer and video editor based in Indonesia. The focus is
          simple: strong ideas, careful typography and stories told in both
          still and moving images — built for brands, feeds and screens.
        </Reveal>

        <Reveal as="div" className="intro__action" delay={220}>
          <Link to="/about" className="tlink">
            More About Me
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
