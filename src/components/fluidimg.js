import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const FluidImg = ({ img, alt, smalldesc = "", imgStyle = {} }) => (
  <>
    <GatsbyImage image={img} alt={alt} imgStyle={imgStyle} />
    <small dangerouslySetInnerHTML={{ __html: smalldesc }} />
  </>
)

export default FluidImg
