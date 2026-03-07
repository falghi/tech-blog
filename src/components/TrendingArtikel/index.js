import React from 'react'
import { Link } from "gatsby"

import SmallArticle from "../TwoSidedArticleList/SmallArticle"
import FluidImg from '../fluidimg'

import { Styles } from "./style"
import { rhythm } from "../../utils/typography"
import { shortenText } from "../../utils/textformatting"

function TrendingArtikel({ posts }) {
  if (posts.length === 0) return <></>

  const firstPost = posts[0]
  const slug = firstPost.fields?.slug || firstPost.slug
  const title = firstPost.frontmatter?.title || firstPost.title
  const topimage = firstPost.frontmatter?.topimage || firstPost.topimage
  const excerpt = firstPost.excerpt

  const smallerSecondPosts = JSON.parse(JSON.stringify(posts.slice(1)))
  smallerSecondPosts.forEach((node) => {
    node.excerpt = shortenText(node.excerpt, 120)
  })

  return (
    <Styles>
      <div className="trending-side-left">
        <Link to={slug} className="first-trending">
          {topimage?.childImageSharp?.fluid && (
            <div className="first-trending-img">
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
        </Link>
      </div>
      <div className="trending-side-right trending-desktop">
        {smallerSecondPosts.map((node, idx) => <SmallArticle key={idx} node={node} /> )}
      </div>
      <div className="trending-side-right trending-mobile">
        {posts.slice(1).map((node, idx) => <SmallArticle key={idx} node={node} /> )}
      </div>
    </Styles>
  )
}

export default TrendingArtikel
