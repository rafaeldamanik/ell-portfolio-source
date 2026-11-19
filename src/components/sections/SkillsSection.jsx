"use client"

import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import skills from "@/data/skills.json"
import { pad } from "@/utils"

/** Software & skills — Swiss hairline grid, exactly the listed tools. */
export default function SkillsSection() {
  return (
    <section className="section" aria-labelledby="ell-skills-title">
      <div className="container">
        <Reveal variant="fade">
          <SectionHeading index="04" label="Software & Skills" />
        </Reveal>

        <h2 id="ell-skills-title" className="sr-only">
          Software and skills
        </h2>

        <div className="skl__grid">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 60} className="skl__cell">
              <span className="skl__num">{pad(i + 1)}</span>
              <h3 className="skl__name">{skill.name}</h3>
              <p className="skl__field">{skill.field}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
