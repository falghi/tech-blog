import React from "react"

import { Icon } from "../Icons"

import { ContactSection, CtaButtonFilled } from "./styles"

const Contact = ({ profile }) => {
  const [linkedin] = profile.social

  const cards = [
    {
      icon: "linkedin",
      title: "Get in touch",
      body: "LinkedIn is the best way to reach me",
      href: linkedin.to,
    },
    {
      icon: "github",
      title: "See my code",
      body: "Open source work and side projects",
      href: profile.social.find(s => s.icon === "github").to,
    },
    {
      icon: "location",
      title: "Where to find me",
      body: profile.location,
    },
  ]

  return (
    <ContactSection id="contact" className="alt-surface">
      <div className="layout">
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-title">I&apos;d love to hear from you.</h2>
        <p className="section-lead">
          Have a project in mind, a role to fill, or just want to talk about
          system design? My inbox is always open.
        </p>

        <div className="contact-cards">
          {cards.map(({ icon, title, body, href }) => {
            const inner = (
              <>
                <Icon name={icon} fontSize="medium" className="contact-icon" />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </>
            )

            return href ? (
              <a
                className="contact-card"
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div className="contact-card" key={title}>
                {inner}
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <CtaButtonFilled href={linkedin.to} target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </CtaButtonFilled>
        </div>
      </div>
    </ContactSection>
  )
}

export default Contact