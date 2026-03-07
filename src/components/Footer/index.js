import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

import { navData } from "../Header"
import { rhythm } from "../../utils/typography"

const StyledFooter = styled.footer`
  padding-top: ${rhythm(1.5)};
  text-align: center;

  .MuiBreadcrumbs-ol {
    justify-content: center;
  }

  li {
    margin-bottom: .5rem;
  }

  a {
    box-shadow: none;
    transition: color 0.25s;
  }

  a:hover {
    color: ${props => props.theme.color.red};
  }

  hr {
    margin-top: .5rem;
    margin-bottom: .75rem;
  }

  small {
    display: inline-block;
    padding-top: .5rem;
    color: gray;
  }
`

const anotherNavdata = [
  {
    to: "/privacy-policy",
    name: "Privacy Policy",
    external: false
  },
  {
    to: "https://falghifari.com/#contact",
    name: "Contact",
    external: true
  },
]

export default function index() {
  return (
    <StyledFooter>
      <div className="layout">
        <Breadcrumbs aria-label="breadcrumb">
          {navData.map(({ to, name }, index) => (
            <Link to={to} key={index}>
              {name}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
      <hr/>
      <div className="layout">
        <Breadcrumbs aria-label="breadcrumb">
          {anotherNavdata.map(({ to, name, external }, index) => (
            external ? (
              <a href={to} key={index} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            ) : (
              <Link to={to} key={index}>
                {name}
              </Link>
            )
          ))}
        </Breadcrumbs>
        <small>
          © {new Date().getFullYear()} Tech Blog by Firdaus Al Ghifari. All rights reserved
        </small>
      </div>
    </StyledFooter>
  )
}
