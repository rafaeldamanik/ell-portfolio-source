/**
 * Shared utilities.
 */

/** Join class names, skipping falsy values. */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ")
}

/** WhatsApp deep link with a URL-encoded pre-filled message. */
export function whatsappUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Standard props for external links that open a new tab. */
export function externalProps() {
  return { target: "_blank", rel: "noopener noreferrer" }
}

/** Pad a number as "01", "02", ... */
export function pad(n) {
  return String(n).padStart(2, "0")
}
