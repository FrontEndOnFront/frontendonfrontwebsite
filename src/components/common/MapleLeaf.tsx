const LEAF = [
  "00000100000",
  "00001110000",
  "01001110010",
  "01111111110",
  "00111111100",
  "11111111111",
  "01111111110",
  "00111111100",
  "00011111000",
  "00000100000",
  "00000100000",
]

/** A pixel-art maple leaf, drawn in the same blocky style as the rail world. */
export function MapleLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 11 11" className={className} fill="currentColor" shapeRendering="crispEdges" aria-hidden>
      {LEAF.flatMap((row, y) =>
        row.split("").map((cell, x) => (cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null))
      )}
    </svg>
  )
}
