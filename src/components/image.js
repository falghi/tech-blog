import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

/*
 * Renders an optimized image from ./assets by file name (the path relative to
 * that folder), resolved at build time with `useStaticQuery` so callers do not
 * have to thread image data down from page queries.
 *
 * For more information, see the docs:
 * - `gatsby-plugin-image`: https://gatsby.dev/gatsby-plugin-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */
const Image = ({ imgName, alt = "", smalldesc = "", imgStyle = {} }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "assets" }
          extension: { regex: "/(jpg|jpeg|png|webp|tif|tiff)/" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 800, quality: 90)
          }
        }
      }
    }
  `)

  const image = data.allFile.nodes.find(
    node => node.relativePath === imgName && node.childImageSharp
  )

  if (!image) {
    return null
  }

  return (
    <>
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        alt={alt}
        imgStyle={imgStyle}
      />
      <small dangerouslySetInnerHTML={{ __html: smalldesc }} />
    </>
  )
}

export default Image
