import React from "react"
import FluidImg from "../fluidimg"

import { rhythm } from "../../utils/typography"

const Bio = ({ username, name, summary, picture, coauthor }) => {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1 / 2),
        alignItems: `center`,
      }}
    >
      {picture?.gatsbyImageData && (
        <div
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 55,
          }}
        >
          <FluidImg
            img={picture.gatsbyImageData}
            alt={name}
            imgStyle={{ borderRadius: "50%" }}
          />
        </div>
      )}
      <div>
        {coauthor ? "Co-authored" : "Written"} by <strong>{name}</strong>
        {summary && (
          <>
            <br />
            {summary}
          </>
        )}
      </div>
    </div>
  )
}

Bio.defaultProps = {
  coauthor: false,
}

export default Bio
