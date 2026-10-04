import React, { Component } from "react"
import { Link } from "gatsby"

import FluidImg from "../fluidimg"

import { Styles } from "./style"

export default class RekomendasiArtikel extends Component {
  render() {
    const { posts } = this.props

    return (
      <Styles>
        {posts.map((node, idx) => {
          const slug = node.fields?.slug || node.slug
          const title = node.frontmatter?.title || node.title
          const topimage = node.frontmatter?.topimage || node.topimage

          return (
            <Link key={idx} to={slug} className="one-recommend">
              {topimage?.childImageSharp?.gatsbyImageData && (
                <FluidImg
                  img={topimage.childImageSharp.gatsbyImageData}
                  alt={title}
                />
              )}
              <h4>{title}</h4>
            </Link>
          )
        })}
      </Styles>
    )
  }
}
