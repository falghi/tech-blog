import React from "react"
import { Link } from "gatsby"

import { Icon } from "../Icons"

import { CtaButton, CtaButtonFilled, HeroSection } from "./styles"

const Hero = ({ profile }) => {
  return (
    <HeroSection id="intro">
      <div className="layout">
        <div className="hero-greeting">Hey..</div>
        <h1 className="hero-name">I&apos;m {profile.name}.</h1>

        <div className="hero-roles">
          {profile.roles.map(role => (
            <span className="hero-role" key={role}>
              {role}
            </span>
          ))}
        </div>

        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-meta">
          <span>
            <Icon name="location" fontSize="small" />
            {profile.location}
          </span>
          <span>
            <Icon name="email" fontSize="small" />
            {profile.email}
          </span>
        </div>

        <div className="hero-actions">
          <CtaButtonFilled as={Link} to="/#projects">
            View My Work
          </CtaButtonFilled>
          <CtaButton as={Link} to="/blog/">
            Read the Blog
          </CtaButton>
        </div>
      </div>
    </HeroSection>
  )
}

export default Hero
