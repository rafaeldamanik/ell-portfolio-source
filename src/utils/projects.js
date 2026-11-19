import data from "@/data/projects.json"

/**
 * Central access to project data.
 * Every project gets a resolved `categoryLabel` so UI components
 * never have to map category ids themselves.
 */

const CATEGORY_MAP = data.categories.reduce((acc, c) => {
  acc[c.id] = c.label
  return acc
}, {})

const PROJECTS = data.projects.map((p, i) => ({
  ...p,
  order: i + 1,
  categoryLabel: CATEGORY_MAP[p.category] || p.category,
}))

export function getAllProjects() {
  return PROJECTS
}

export function getFeaturedProjects(limit = 3) {
  return PROJECTS.filter((p) => p.featured).slice(0, limit)
}

export function getCategories() {
  return data.categories
}

export function countByCategory(id) {
  return PROJECTS.filter((p) => p.category === id).length
}
