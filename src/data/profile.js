/**
 * ---------------------------------------------------------------
 *  ell. — PROFILE DATA
 *  Edit everything in this file to update personal information.
 *  Nothing here is invented: fill in real details when you have them.
 * ---------------------------------------------------------------
 */

export const profile = {
  // Identity
  name: "Rafael Damanik",
  brand: "ell.",
  role: "Graphic Designer & Video Editor",
  location: "Indonesia",
  availability: "Available for freelance projects",

  // Contact (used by Contact page, floating button, footer)
  email: "rafaeldamanik3@gmail.com",
  whatsappNumber: "6282277361612", // international format, no "+" and no spaces
  whatsappDisplay: "+62 822-7736-1612",
  whatsappMessage: "Halo ell! Saya tertarik untuk bekerja sama dengan Anda.",
  instagramHandle: "@rafaeldamanikk",
  instagramUrl: "https://www.instagram.com/rafaeldamanikk",
  githubHandle: "@rafaeldamanik",
  githubUrl: "https://github.com/rafaeldamanik",

  // Profile photo — replace the file to change it (keep the same name/path)
  portrait: "assets/images/profile/portrait.webp",
  portraitAlt: "Creative portrait of Rafael Damanik",

  // Hero — one short, natural sentence
  heroIntro:
    "Independent graphic designer and video editor. I turn ideas into clear, expressive visuals — from brand identities and social media content to stories told in motion.",

  // About page — edit freely
  about: {
    lead: "I am Rafael — a graphic designer and video editor working under the name ell.",
    paragraphs: [
      "I focus on graphic design, visual storytelling, and social media design. Every project starts with a simple question: what should people feel when they see this? The answer shapes everything that follows — the layout, the color, the rhythm, and the motion.",
      "My work moves between still and moving images. One day I might be building a visual identity or designing a set of social media posts; the next, I am cutting a short video and shaping its pacing. That mix keeps my eye trained on both detail and flow.",
      "If you have an idea that needs a shape — a brand, a feed, a story — I would love to hear about it.",
    ],
    quote: "Good design is quiet structure with a loud idea.",
    interests: [
      "Editorial layouts",
      "Typographic systems",
      "Visual storytelling",
      "Social media culture",
      "Short-form video",
      "Photography",
    ],
  },

  /**
   * Experience / CV — intentionally empty of claims.
   * The entries below are placeholders. Replace them with real
   * roles, studios and periods when available. Nothing will be
   * presented as real experience until you edit this list.
   */
  cv: {
    note: "No real entries here yet. This section is a template — add your actual experience in src/data/profile.js and it will show up automatically.",
    entries: [
      { period: "20XX", role: "Your role or title", place: "Studio / company / client" },
      { period: "20XX", role: "Your role or title", place: "Studio / company / client" },
    ],
  },
}

/** Ready-to-use WhatsApp link with the pre-filled message */
export function whatsappLink() {
  return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(
    profile.whatsappMessage
  )}`
}
