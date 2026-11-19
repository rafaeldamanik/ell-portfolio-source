"use client"

import { Link } from "react-router-dom"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { ArrowUpRight } from "@/components/Icons"
import services from "@/data/services.json"

/**
 * Creative services — dark editorial rows, no pricing,
 * each row leads to the contact page.
 */
export default function ServicesSection() {
  return (
    <section className="section svc" aria-labelledby="ell-services-title">
      <div className="container">
        <Reveal variant="fade">
          <SectionHeading index="03" label="Creative Services" />
        </Reveal>

        <Reveal as="h2" className="svc__big" id="ell-services-title" delay={80}>
          What I can do <em>for you</em>
        </Reveal>

        <div className="svc__rows">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 70}>
              <Link
                to="/contact"
                className="svc__row"
                aria-label={`Ask about ${service.title} on the contact page`}
              >
                <span className="svc__idx">{service.index}</span>
                <span>
                  <span className="svc__title">{service.title}</span>
                </span>
                <span>
                  <span className="svc__desc">{service.description}</span>
                  <span className="svc__tags">
                    {service.tags.map((tag) => (
                      <span className="svc__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="svc__arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="svc__cta" delay={120}>
          <p>Have something specific in mind?</p>
          <Link to="/contact" className="btn btn--light">
            Start a Project <ArrowUpRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
