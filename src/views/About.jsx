"use client"

import { Link } from "react-router-dom"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import useDocumentMeta from "@/hooks/useDocumentMeta"
import { profile } from "@/data/profile"
import { whatsappLink } from "@/data/profile"
import { ArrowUpRight } from "@/components/Icons"
import skills from "@/data/skills.json"
import { pad } from "@/utils"

/**
 * About page — editorial layout with sticky portrait, personal
 * introduction (edit text in src/data/profile.js), interests,
 * software skills and a template Experience / CV section.
 */
export default function About() {
  useDocumentMeta(
    "About — ell.",
    "Rafael Damanik (ell.) — graphic designer and video editor focused on design, visual storytelling, social media content and video editing."
  )

  return (
    <>
      <section className="phead">
        <div className="container">
          <Reveal variant="fade">
            <SectionHeading index="01" label="About Me" />
          </Reveal>
          <Reveal as="h1" className="phead__title" delay={80}>
            {profile.name}
            <sup>( ell. )</sup>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-label="About Rafael Damanik">
        <div className="container ab__grid">
          <Reveal as="figure" className="ab__media" variant="fade" delay={140}>
            <div className="ab__media-wrap">
              <img
                src={profile.portrait}
                alt={profile.portraitAlt}
                width={960}
                height={1200}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              {profile.name} — {profile.role}
            </figcaption>
          </Reveal>

          <div>
            <Reveal as="p" className="ab__lead" delay={100}>
              {profile.about.lead}
            </Reveal>

            <div className="ab__body">
              {profile.about.paragraphs.map((text, i) => (
                <Reveal as="p" key={i} delay={140 + i * 60}>
                  {text}
                </Reveal>
              ))}
            </div>

            <Reveal as="blockquote" className="ab__quote" delay={140}>
              &ldquo;{profile.about.quote}&rdquo;
            </Reveal>

            <div className="ab__block">
              <Reveal variant="fade">
                <SectionHeading index="02" label="Creative Interests" />
              </Reveal>
              <Reveal as="div" className="ab__chips" delay={120}>
                {profile.about.interests.map((interest) => (
                  <span className="ab__chip" key={interest}>
                    {interest}
                  </span>
                ))}
              </Reveal>
            </div>

            <div className="ab__block">
              <Reveal variant="fade">
                <SectionHeading index="03" label="Software & Skills" />
              </Reveal>
              <div className="ab__rows">
                {skills.map((skill, i) => (
                  <Reveal key={skill.name} delay={i * 50} className="ab__row">
                    <span className="ab__row-period">{pad(i + 1)}</span>
                    <span className="ab__row-main">
                      <span className="ab__row-name">{skill.name}</span>
                      <span className="ab__row-place">{skill.field}</span>
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="ab__block">
              <Reveal variant="fade">
                <SectionHeading index="04" label="Experience / CV" />
              </Reveal>
              <div className="ab__rows">
                {profile.cv.entries.map((entry, i) => (
                  <Reveal key={i} delay={i * 50} className="ab__row">
                    <span className="ab__row-period">{entry.period}</span>
                    <span className="ab__row-main">
                      <span className="ab__row-name">{entry.role}</span>
                      <span className="ab__row-place">{entry.place}</span>
                    </span>
                  </Reveal>
                ))}
              </div>
              <p className="ab__note">{profile.cv.note}</p>
            </div>

            <Reveal as="div" className="ab__cta" delay={120}>
              <Link to="/contact" className="btn btn--solid">
                Start a Project <ArrowUpRight />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="tlink"
              >
                Or Chat on WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
