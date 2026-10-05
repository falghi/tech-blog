import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { InfoList, TwoColumn } from "./styles"

const About = ({ portrait, profile }) => {
  const image = getImage(portrait)

  const info = [
    { label: "Fullname", value: profile.name },
    { label: "Based in", value: profile.location },
    { label: "Role", value: profile.roles[0] },
    { label: "Website", value: "falghifari.com" },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  ]

  return (
    <TwoColumn>
      <div className="col-image">
        {image && (
          <GatsbyImage
            image={image}
            alt={profile.name}
            style={{ borderRadius: "50%" }}
          />
        )}
      </div>

      <div className="col-body">
        <InfoList>
          {info.map(({ label, value, href }) => (
            <li key={label}>
              <strong>{label}:</strong>
              {href ? (
                <span>
                  <a href={href}>{value}</a>
                </span>
              ) : (
                <span>{value}</span>
              )}
            </li>
          ))}
        </InfoList>
      </div>
    </TwoColumn>
  )
}

export default About
