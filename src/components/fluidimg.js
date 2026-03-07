import React from "react"
import Img from "gatsby-image"

const FluidImg = ({ img, alt, smalldesc, imgStyle }) => (
  <>
    <Img fluid={img} alt={alt} imgStyle={imgStyle} />
    <small dangerouslySetInnerHTML={{ __html: smalldesc }} />
  </>
)

FluidImg.defaultProps = {
  smalldesc: "",
  imgStyle: {}
}

export default FluidImg
