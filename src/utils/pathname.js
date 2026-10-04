// Tracks the current pathname outside of React so the header can highlight the
// active nav link after client-side navigation. Reading window.location during
// render instead would break hydration, since the server has no window.

let pathname = "/"
const listeners = new Set()

const normalize = value => {
  if (!value) return "/"
  return value.endsWith("/") ? value : `${value}/`
}

export const getPathname = () => pathname

export const setPathname = value => {
  const next = normalize(value)

  if (next === pathname) return

  pathname = next
  listeners.forEach(listener => listener(pathname))
}

export const subscribePathname = listener => {
  listeners.add(listener)

  return () => listeners.delete(listener)
}
