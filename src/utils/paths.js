// Every blog route lives under /blog, so components that link to a post or a
// category should go through here rather than building paths by hand.
export const BLOG_PREFIX = "/blog"

export const blogPath = node => {
  const slug = node?.fields?.slug ?? node?.slug ?? ""

  // Guard against double-prefixing when a slug is already absolute under /blog.
  if (slug.startsWith(BLOG_PREFIX)) return slug

  return `${BLOG_PREFIX}${slug.startsWith("/") ? slug : `/${slug}`}`
}

export const categoryPath = category =>
  `${BLOG_PREFIX}/category/${category}/`

export default blogPath
