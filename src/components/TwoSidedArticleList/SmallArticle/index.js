import React from "react"
import { Link } from "gatsby"

import FluidImg from "../../fluidimg"

import { Styles } from "./style"
import { rhythm } from "../../../utils/typography"

export default function SmallArticle({ node }) {
  const slug = node.fields?.slug || node.slug
  const title = node.frontmatter?.title || node.title
  const topimage = node.frontmatter?.topimage || node.topimage
  const excerpt = node.excerpt

  return (
    <Styles>
      <Link to={slug}>
        <article className="article-box">
          {topimage?.childImageSharp?.fluid && (
            <div className="article-box-image">
              <FluidImg img={topimage.childImageSharp.fluid} alt={title} />
            </div>
          )}
          <div className="article-box-desc">
            <header>
              <h2
                className="article-box-title"
                style={{
                  marginTop: 0,
                  marginBottom: rhythm(1 / 2),
                }}
              >
                {title}
              </h2>
            </header>
            <section>
              <p
                className="small-article-desc"
                dangerouslySetInnerHTML={{
                  __html: excerpt,
                }}
              />
            </section>
            <span className="read-more">READ MORE →</span>
          </div>
        </article>
      </Link>
    </Styles>
  )
}
