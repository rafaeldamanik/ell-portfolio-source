"use client"

const ITEMS = ["Graphic Design", "Social Media Design", "Video Editing", "Photography"]

/** Editorial marquee strip — static when reduced motion is preferred. */
export default function Marquee() {
  const group = (hidden) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span className="marquee__item" key={`${item}-${hidden ? "b" : "a"}`}>
          {item}
          <span className="marquee__sep" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
