"use client"

import Hero from "@/components/sections/Hero"
import Marquee from "@/components/sections/Marquee"
import Intro from "@/components/sections/Intro"
import FeaturedWorks from "@/components/sections/FeaturedWorks"
import ServicesSection from "@/components/sections/ServicesSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ContactCTA from "@/components/sections/ContactCTA"
import useDocumentMeta from "@/hooks/useDocumentMeta"

export default function Home() {
  useDocumentMeta(
    "ell. — Rafael Damanik | Graphic Designer & Video Editor",
    "Portfolio of Rafael Damanik (ell.) — independent graphic designer and video editor based in Indonesia. Graphic design, social media design, video editing and photography."
  )

  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <FeaturedWorks />
      <ServicesSection />
      <SkillsSection />
      <ContactCTA />
    </>
  )
}
