/**
 * Static 404 — rendered by Next.js as 404.html on static export
 * (used as the GitHub Pages fallback) and shown for unmatched routes.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3EFE6",
        color: "#141412",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "18px",
        fontFamily:
          "'Instrument Serif', Georgia, 'Times New Roman', serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <p style={{ fontSize: "clamp(4rem, 14vw, 9rem)", lineHeight: 0.9, margin: 0 }}>
        404<span style={{ color: "#2E4BFF" }}>.</span>
      </p>
      <p
        style={{
          fontFamily:
            "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
          fontSize: "0.9rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#3B3A36",
          margin: 0,
        }}
      >
        This page drifted off the grid
      </p>
      <a
        href="/"
        style={{
          border: "1px solid #141412",
          borderRadius: "999px",
          padding: "0.9em 1.9em",
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#F3EFE6",
          background: "#141412",
          textDecoration: "none",
        }}
      >
        Back Home
      </a>
    </div>
  )
}
