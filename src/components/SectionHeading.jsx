"use client"

/**
 * Editorial section heading: "( 01 ) — Label .......... [action]"
 */
export default function SectionHeading({ index, label, action, dark = false }) {
  return (
    <div className={`shead${dark ? " shead--dark" : ""}`}>
      {index && <span className="shead__idx">{`( ${index} )`}</span>}
      <span>{label}</span>
      {action && <span className="shead__action">{action}</span>}
    </div>
  )
}
