"use client"

import { Link } from "react-router-dom"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import ProjectCard from "@/components/ProjectCard"
import ProjectModal from "@/components/ProjectModal"
import useProjectModal from "@/hooks/useProjectModal"
import { getFeaturedProjects } from "@/utils/projects"

/**
 * Featured works in an asymmetric editorial grid. The three slots
 * use distinct proportions so nothing looks like a uniform card row.
 */
const SLOT_RATIOS = ["4 / 3", "3 / 4", "8 / 5"]
const SLOT_CLASSES = ["fw__item--a", "fw__item--b", "fw__item--c"]

export default function FeaturedWorks() {
  const featured = getFeaturedProjects(3)
  const { activeProject, openProject, closeProject, stepProject } =
    useProjectModal(featured)

  return (
    <section className="section" aria-labelledby="ell-featured-title">
      <div className="container">
        <Reveal variant="fade">
          <SectionHeading
            index="02"
            label="Selected Works"
            action={
              <Link to="/works" className="tlink">
                View All Works
              </Link>
            }
          />
        </Reveal>

        <h2 id="ell-featured-title" className="sr-only">
          Selected works
        </h2>

        <div className="fw__grid">
          {featured.map((project, i) => (
            <Reveal
              key={project.id}
              className={`fw__item ${SLOT_CLASSES[i]}`}
              delay={i * 90}
            >
              <ProjectCard
                project={project}
                index={i + 1}
                ratio={SLOT_RATIOS[i]}
                onOpen={() => openProject(project.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        list={featured}
        onClose={closeProject}
        onStep={stepProject}
      />
    </section>
  )
}
