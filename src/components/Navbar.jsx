"use client"

import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import useScrollY from "@/hooks/useScrollY"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import { cx, pad } from "@/utils"
import { Close } from "@/components/Icons"
import { profile, whatsappLink } from "@/data/profile"

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const y = useScrollY()
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  // Escape closes the menu
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useBodyScrollLock(open)

  const scrolled = y > 24

  return (
    <>
      <header className={cx("nav", scrolled && "is-scrolled")}>
        <div className="container nav__inner">
          <Link to="/" className="nav__brand" aria-label="ell. — back to home">
            ell<span className="dot">.</span>
          </Link>

          <div className="nav__right">
            <nav className="nav__links" aria-label="Primary">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) => cx("nav__link", isActive && "is-active")}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <Link to="/contact" className="btn btn--solid btn--sm nav__cta">
              Start a Project
            </Link>

            <button
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-controls="ell-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="ell-menu"
        className={cx("menu", open && "is-open")}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className="menu__bar">
          <span className="menu__brand">
            ell<span className="dot">.</span>
          </span>
          <button
            type="button"
            className="menu__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <Close />
          </button>
        </div>

        <nav className="menu__links" aria-label="Mobile">
          {LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) => cx("menu__link", isActive && "is-active")}
              style={{ transitionDelay: open ? `${90 + i * 70}ms` : "0ms" }}
              tabIndex={open ? 0 : -1}
            >
              <span className="menu__num">{pad(i + 1)}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="menu__foot">
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>
            {profile.email}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            WhatsApp {profile.whatsappDisplay}
          </a>
          <span>{profile.location}</span>
        </div>
      </div>
    </>
  )
}
