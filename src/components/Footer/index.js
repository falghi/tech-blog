import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { navData } from "../Header"
import { rhythm } from "../../utils/typography"

const StyledFooter = styled.footer`
  padding-top: ${rhythm(1.5)};
  text-align: center;
  border-top: 1px solid ${props => props.theme.color.lightgray};

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: ${rhythm(0.75)};
  }

  .footer-nav a {
    box-shadow: none;
    transition: color 0.25s;
    padding: 4px 14px;
  }

  .footer-nav a:hover {
    color: ${props => props.theme.color.red};
  }

  .footer-social {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: ${rhythm(0.5)};
  }

  .footer-social a {
    color: #555;
    box-shadow: none;
    padding: 6px 10px;
    font-size: 0.95rem;
    transition: color 0.25s;
  }

  .footer-social a:hover {
    color: ${props => props.theme.color.primary};
  }

  hr {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
  }

  small {
    display: inline-block;
    padding-top: 0.5rem;
    color: gray;
  }
`

const socialLinks = [
  { name: "GitHub", to: "https://github.com/falghi" },
  { name: "LinkedIn", to: "https://www.linkedin.com/in/alghi" },
  { name: "Instagram", to: "https://www.instagram.com/alghi01/" },
  { name: "Medium", to: "https://medium.com/@firdaus.alghifari" },
]

export default function Footer() {
  return (
    <StyledFooter>
      <div className="layout">
        <nav className="footer-nav" aria-label="footer">
          {navData.map(({ to, name }) => (
            <Link to={to} key={name}>
              {name}
            </Link>
          ))}
          <Link to="/blog/privacy-policy/">Privacy Policy</Link>
        </nav>

        <div className="footer-social">
          {socialLinks.map(({ name, to }) => (
            <a href={to} key={name} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          ))}
        </div>

        <hr />

        <small>
          © {new Date().getFullYear()} Firdaus Al Ghifari. All rights reserved
        </small>
      </div>
    </StyledFooter>
  )
}
