export function getRelativeCoordinates(element) {
  const r = { x: element.offsetLeft, y: element.offsetTop }
  if (element.offsetParent) {
    const tmp = getRelativeCoordinates(element.offsetParent)
    r.x += tmp.x
    r.y += tmp.y
  }
  return r
}
