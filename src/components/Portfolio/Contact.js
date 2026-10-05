import React from "react"

import { Icon } from "../Icons"

import { ContactSection, CtaButtonFilled } from "./styles"

const Contact = ({ profile }) => {
  const cards = [
    {
      icon: "location",
      title: "Where to find me",
      body: profile.location,
    },
    {
      icon: "email",
      title: "Email me at",
      body: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: "linkedin",
      title: "Reach me at",
      body: "LinkedIn, Instagram",
      href: profile.social.find(s => s.icon === "linkedin").to,
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
                target={href.startsWith("mailto:") ? undefined : "_blank"}
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
          <CtaButtonFilled href={`mailto:${profile.email}`}>
            Send me an email
          </CtaButtonFilled>
        </div>
      </div>
    </ContactSection>
  )
}

export default Contact
