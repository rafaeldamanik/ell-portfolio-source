"use client"

import { Link } from "react-router-dom"
import { profile, whatsappLink } from "@/data/profile"
import { externalProps, pad } from "@/utils"
import { getCategories } from "@/utils/projects"

const MENU = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="big">
              ell<span className="dot">.</span>
            </p>
            <p className="footer__tagline">
              {profile.role} — independent visual work in design, social media and motion.
            </p>
          </div>

          <nav className="footer__col" aria-label="Footer menu">
            <h2 className="label footer__heading">Menu</h2>
            {MENU.map((item, i) => (
              <Link key={item.to} to={item.to}>
                {pad(i + 1)} — {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer__col">
            <h2 className="label footer__heading">Contact</h2>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={whatsappLink()} {...externalProps()}>
              WhatsApp — {profile.whatsappDisplay}
            </a>
            <a href={profile.instagramUrl} {...externalProps()}>
              Instagram — {profile.instagramHandle}
            </a>
            <a href={profile.githubUrl} {...externalProps()}>
              GitHub — {profile.githubHandle}
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {profile.name} — ell<span className="dot">.</span>
          </span>
          <span>{profile.role}</span>
          <span>Based in {profile.location}</span>
        </div>
      </div>
    </footer>
  )
}
