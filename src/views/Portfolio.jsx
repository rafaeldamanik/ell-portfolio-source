"use client"

import { useMemo, useState } from "react"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import ProjectCard from "@/components/ProjectCard"
import ProjectModal from "@/components/ProjectModal"
import useProjectModal from "@/hooks/useProjectModal"
import useDocumentMeta from "@/hooks/useDocumentMeta"
import { getAllProjects, getCategories } from "@/utils/projects"
import { cx, pad } from "@/utils"

/**
 * Portfolio / Works — masonry grid with category filtering and
 * project detail modal. All data comes from src/data/projects.json.
 */
export default function Portfolio() {
  useDocumentMeta(
    "Works — ell.",
    "Selected works of Rafael Damanik (ell.) — graphic design, social media design, video editing and photography projects."
  )

  const [filter, setFilter] = useState("all")
  const allProjects = useMemo(() => getAllProjects(), [])
  const categories = useMemo(() => getCategories(), [])

  const filtered = useMemo(
    () =>
      filter === "all"
        ? allProjects
        : allProjects.filter((p) => p.category === filter),
    [allProjects, filter]
  )

  const { activeProject, openProject, closeProject, stepProject } =
    useProjectModal(filtered)

  const counts = useMemo(() => {
    const map = { all: allProjects.length }
    categories.forEach((c) => {
      map[c.id] = allProjects.filter((p) => p.category === c.id).length
    })
    return map
  }, [allProjects, categories])

  const filters = [{ id: "all", label: "All Works" }, ...categories]

  return (
    <>
      <section className="phead">
        <div className="container">
          <Reveal variant="fade">
            <SectionHeading index="01" label="Portfolio / Works" />
          </Reveal>
          <div className="phead__row">
            <Reveal as="h1" className="phead__title" delay={80}>
              Selected
              <br />
              Works<sup>( {pad(filtered.length)} )</sup>
            </Reveal>
            <Reveal as="p" className="phead__aside" delay={140}>
              Graphic design, social media design, video editing and
              photography — arranged as an editorial grid.
              <span className="note">
                Layout preview: these are placeholder projects for testing the
                grid. Replace them with real work in src/data/projects.json.
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Project list">
        <div className="container">
          <div className="pf__filters" role="group" aria-label="Filter projects by category">
            {filters.map((f) => (
              <button
                type="button"
                key={f.id}
                className={cx("pf__filter", filter === f.id && "is-active")}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {f.label}
                <sup>({pad(counts[f.id] || 0)})</sup>
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="pf__grid" key={filter}>
              {filtered.map((project, i) => (
                <div
                  className="pf__item"
                  key={project.id}
                  style={{ animationDelay: `${Math.min(i, 9) * 70}ms` }}
                >
                  <ProjectCard
                    project={project}
                    index={i + 1}
                    onOpen={() => openProject(project.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="pf__empty">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        list={filtered}
        onClose={closeProject}
        onStep={stepProject}
      />
    </>
  )
}
