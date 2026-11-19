"use client"

import { useEffect } from "react"
import { HashRouter, Routes, Route, useLocation } from "react-router-dom"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LoadingScreen from "@/components/LoadingScreen"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import BackToTop from "@/components/BackToTop"

import Home from "@/views/Home"
import About from "@/views/About"
import Portfolio from "@/views/Portfolio"
import Contact from "@/views/Contact"
import NotFound from "@/views/NotFound"

import "@/styles/navbar.css"
import "@/styles/footer.css"
import "@/styles/home.css"
import "@/styles/portfolio.css"
import "@/styles/pages.css"

/**
 * Reset scroll on every route change. Hash routing is used so the
 * site works on GitHub Pages without server-side rewrites.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <main
      id="main-content"
      tabIndex={-1}
      key={location.pathname}
      className="page"
      style={{ outline: "none" }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

function SkipLink() {
  return (
    <button
      type="button"
      className="skip-link"
      onClick={() => {
        const el = document.getElementById("main-content")
        if (el) el.focus()
      }}
    >
      Skip to content
    </button>
  )
}

/**
 * Hydration-safe "mounted" detection: false during SSR / hydration,
 * true on the client afterwards. Based on the official React docs
 * pattern for client-only UI.
 */
/**
 * Root of the ell. portfolio SPA. This module is only loaded on the
 * client (see src/app/page.tsx), so window-dependent code is safe.
 */
export default function App() {
  useEffect(() => {
    // Marks that JS is running — reveal animations stay disabled without it
    document.documentElement.classList.add("js")
  }, [])

  return (
    <HashRouter>
      <ScrollToTop />
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <SkipLink />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </HashRouter>
  )
}
