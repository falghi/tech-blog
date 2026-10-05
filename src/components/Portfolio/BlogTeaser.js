import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import { rhythm } from "../../utils/typography"

import { blogPath } from "../../utils/paths"

import { CtaButtonFilled, Section } from "./styles"

const TeaserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${rhythm(1)};
  margin-bottom: ${rhythm(1.5)};
`

const TeaserCard = styled(Link)`
  display: block;
  color: inherit;
  box-shadow: none;
  border: 1px solid ${props => props.theme.color.lightgray};
  background: white;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.theme.color.secondary};
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.1);
  }

  .teaser-media {
    border-bottom: 1px solid ${props => props.theme.color.lightgray};
    height: 190px;
    overflow: hidden;
  }

  /* Card heights vary with excerpt length; align the media so the grids line up. */
  .teaser-body {
    display: flex;
    flex-direction: column;
  }

  .teaser-body p {
    flex: 1 1 auto;
  }

  .teaser-category {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
  }

  h3 {
    margin: 4px 0 8px;
    font-size: 1.05rem;
    transition: color 0.25s;
  }

  &:hover h3 {
    color: ${props => props.theme.color.red};
  }

  p {
    margin: 0 0 8px;
    font-size: 0.88rem;
    color: #555;
    line-height: 1.55;
  }

  small {
    color: #777;
  }

  .teaser-body {
    padding: ${rhythm(0.75)};
  }
`

const BlogTeaser = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <Section className="alt-surface" id="writing">
      <div className="layout">
        <span className="section-eyebrow">Writing</span>
        <h2 className="section-title">From the blog</h2>
        <p className="section-lead">
          Notes on software engineering, system design, and the occasional deep
          dive into a language or framework.
        </p>

        <TeaserGrid>
          {posts.map(post => {
            const { excerpt, frontmatter } = post
            const { title, date, category, topimage } = frontmatter
            const to = blogPath(post)
            const image = getImage(topimage)

            return (
              <TeaserCard key={to} to={to}>
                {image && (
                  <div className="teaser-media">
                    <GatsbyImage image={image} alt={title} objectFit="cover" />
                  </div>
                )}
                <div className="teaser-body">
                  {category && (
                    <div className="teaser-category">{category}</div>
                  )}
                  <h3>{title}</h3>
                  <p>{frontmatter.description || excerpt}</p>
                  <small>{date}</small>
                </div>
              </TeaserCard>
            )
          })}
        </TeaserGrid>

        <CtaButtonFilled as={Link} to="/blog/">
          Browse all articles
        </CtaButtonFilled>
      </div>
    </Section>
  )
}

export default BlogTeaser
