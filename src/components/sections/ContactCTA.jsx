"use client"

import { Link } from "react-router-dom"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { ArrowUpRight } from "@/components/Icons"
import { profile } from "@/data/profile"

/** Closing contact CTA — dark block with oversized typography. */
export default function ContactCTA() {
  return (
    <section className="section cta" aria-labelledby="ell-cta-title">
      <div className="container">
        <Reveal variant="fade">
          <SectionHeading index="05" label="Contact" />
        </Reveal>

        <Reveal as="h2" className="cta__title" id="ell-cta-title" delay={80}>
          Let&apos;s work
          <br />
          together<span className="dot">.</span>
        </Reveal>

        <div className="cta__row">
          <Reveal as="p" className="cta__note" delay={160}>
            A brand to build, a feed to refresh, or footage waiting for the
            right cut — tell me where you want to go and we will shape it.
          </Reveal>

          <Reveal as="div" className="cta__actions" delay={240}>
            <Link to="/contact" className="btn btn--light">
              Start a Project <ArrowUpRight />
            </Link>
            <a href={`mailto:${profile.email}`} className="tlink cta__mail">
              Email Me
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
