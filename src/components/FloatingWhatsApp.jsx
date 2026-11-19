"use client"

import { whatsappLink } from "@/data/profile"
import { WhatsAppIcon } from "@/components/Icons"

/**
 * Floating WhatsApp button — fixed bottom-right, never covers content,
 * links out with the pre-filled message from profile data.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      className="float-wa"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ell. on WhatsApp"
      data-cursor-label="Chat"
    >
      <WhatsAppIcon />
      <span className="float-tip" aria-hidden="true">
        Chat via WhatsApp
      </span>
    </a>
  )
}
