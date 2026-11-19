"use client"

import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import useDocumentMeta from "@/hooks/useDocumentMeta"
import { profile, whatsappLink } from "@/data/profile"
import { externalProps, pad } from "@/utils"
import { ArrowUpRight } from "@/components/Icons"

/**
 * Contact page — big CTA headline, availability status and working
 * contact links (WhatsApp with a pre-filled message, Instagram,
 * email, GitHub). No contact form by design.
 */
export default function Contact() {
  useDocumentMeta(
    "Contact — ell.",
    "Start a project with Rafael Damanik (ell.) — available for freelance graphic design, social media design and video editing projects."
  )

  const rows = [
    {
      label: "WhatsApp",
      value: profile.whatsappDisplay,
      hint: "Opens with a pre-filled message",
      href: whatsappLink(),
      external: true,
    },
    {
      label: "Instagram",
      value: profile.instagramHandle,
      hint: "Latest work and process",
      href: profile.instagramUrl,
      external: true,
    },
    {
      label: "Email",
      value: profile.email,
      hint: "Briefs, questions and proposals",
      href: `mailto:${profile.email}`,
      external: false,
    },
    {
      label: "GitHub",
      value: profile.githubHandle,
      hint: "Code and experiments",
      href: profile.githubUrl,
      external: true,
    },
  ]

  return (
    <>
      <section className="phead" aria-labelledby="ell-contact-title">
        <div className="container">
          <Reveal variant="fade">
            <SectionHeading index="01" label="Contact" />
          </Reveal>

          <Reveal as="p" className="ct__avail" delay={100}>
            <i aria-hidden="true" />
            {profile.availability}
          </Reveal>

          <Reveal as="h1" className="ct__title" id="ell-contact-title" delay={160}>
            Start a
            <br />
            Project<span className="dot">.</span>
          </Reveal>

          <Reveal as="p" className="ct__intro" delay={220}>
            Have an idea, a brand, or footage that needs shaping? Pick any
            channel below — tell me what you have in mind and we will take it
            from there.
          </Reveal>
        </div>
      </section>

      <section className="section" aria-label="Contact details">
        <div className="container">
          <div className="ct__rows">
            {rows.map((row, i) => (
              <Reveal key={row.label} delay={i * 70} variant="fade">
                <a
                  className="ct__row"
                  href={row.href}
                  {...(row.external ? externalProps() : {})}
                >
                  <span className="ct__row-label">{pad(i + 1)} — {row.label}</span>
                  <span className="ct__row-value">
                    {row.value}
                    <small>{row.hint}</small>
                  </span>
                  <span className="ct__row-arrow" aria-hidden="true">
                    <ArrowUpRight size={26} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="ct__foot">
            <span>Based in {profile.location}</span>
            <span>
              ell<span aria-hidden="true">.</span> — {profile.role}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
