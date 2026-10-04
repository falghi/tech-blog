import React from "react"
import { Link } from "gatsby"

import Bios from "../Bios"
import FluidImg from "../fluidimg"

import { rhythm, scale } from "../../utils/typography"

function BlogPostPage({ post, next, previous }) {
  const title = post.frontmatter?.title || post.title
  const date = post.frontmatter?.date || post.date
  const topimage = post.frontmatter?.topimage || post.topimage
  const topimagedesc = post.frontmatter?.topimagedesc || post.topimagedesc
  const html = post.html
  const author = post.frontmatter?.author || post.authors?.[0]?.name

  return (
    <div className="layout">
      <article style={{ maxWidth: "900px", margin: "0 auto" }}>
        <header>
          <h1
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {date}
          </p>
        </header>
        {topimage?.childImageSharp?.gatsbyImageData && (
          <section>
            {/* GatsbyImage renders a <div>, which a browser would hoist out of a
                wrapping <p> and break hydration. */}
            <FluidImg
              img={topimage.childImageSharp.gatsbyImageData}
              alt={title}
              smalldesc={topimagedesc}
            />
          </section>
        )}
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {author && (
          <footer>
            <Bios authors={[{ name: author }]} />
          </footer>
        )}
      </article>

      <nav
        style={{
          marginTop: rhythm(1.5),
          maxWidth: "900px",
          margin: rhythm(1.5) + " auto 0",
        }}
      >
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields?.slug || previous.slug} rel="prev">
                ← {previous.frontmatter?.title || previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields?.slug || next.slug} rel="next">
                {next.frontmatter?.title || next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default BlogPostPage
