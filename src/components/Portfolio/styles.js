import styled, { keyframes } from "styled-components"

import { rhythm } from "../../utils/typography"

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`

export const Section = styled.section`
  padding-top: ${rhythm(2)};
  padding-bottom: ${rhythm(2)};

  .section-eyebrow {
    display: inline-block;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${props => props.theme.color.primary};
    border-bottom: 2px solid ${props => props.theme.color.secondary};
    padding-bottom: 2px;
    margin-bottom: ${rhythm(0.5)};
  }

  .section-title {
    margin: 0 0 ${rhythm(0.75)};
  }

  .section-lead {
    max-width: 640px;
    color: #444;
    margin-bottom: ${rhythm(1.5)};
  }

  .alt-surface {
    background: ${props => props.theme.color.lightergray};
  }
`

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    ${props => props.theme.color.secondary} 0%,
    #ffffff 55%,
    #ffffff 100%
  );
  border-bottom: 1px solid ${props => props.theme.color.lightgray};
  padding-top: ${rhythm(2.5)};
  padding-bottom: ${rhythm(2.5)};

  .hero-greeting {
    font-size: 1rem;
    color: ${props => props.theme.color.primary};
    font-weight: 700;
    letter-spacing: 0.08em;
    margin: 0 0 ${rhythm(0.25)};
  }

  .hero-name {
    font-size: 2.9rem;
    line-height: 1.1;
    margin: 0 0 ${rhythm(0.75)};
  }

  .hero-roles {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${rhythm(1.25)};
  }

  .hero-role {
    border: 1px solid ${props => props.theme.color.primary};
    color: ${props => props.theme.color.primary};
    border-radius: 999px;
    padding: 5px 16px;
    margin: 0 10px 10px 0;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .hero-summary {
    max-width: 620px;
    font-size: 1.05rem;
    line-height: 1.7;
    color: #333;
    margin-bottom: ${rhythm(1.25)};
  }

  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    color: #555;
    margin-bottom: ${rhythm(1.5)};

    span {
      display: inline-flex;
      align-items: center;
      margin-right: 22px;
      margin-bottom: 8px;
      font-size: 0.92rem;
    }

    svg {
      margin-right: 6px;
      color: ${props => props.theme.color.primary};
    }
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    .hero-name {
      font-size: 2.1rem;
    }
  }
`

export const TwoColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  .col-image {
    width: 320px;
    margin-right: ${rhythm(2)};
  }

  .col-body {
    flex: 1 1 380px;
  }

  @media screen and (max-width: 900px) {
    .col-image {
      width: 100%;
      margin-right: 0;
      margin-bottom: ${rhythm(1)};
    }
  }
`

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    flex-wrap: wrap;
    padding: 9px 0;
    border-bottom: 1px solid ${props => props.theme.color.lightergray};
    font-size: 0.95rem;
  }

  li:last-child {
    border-bottom: 0;
  }

  strong {
    min-width: 120px;
    color: #222;
  }

  span {
    color: #555;
    word-break: break-word;
  }

  a {
    color: ${props => props.theme.color.primary};
  }
`

export const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${rhythm(1)};

  .skill-card {
    border: 1px solid ${props => props.theme.color.lightgray};
    border-left: 4px solid ${props => props.theme.color.primary};
    padding: ${rhythm(0.75)} ${rhythm(1)};
    background: white;
    transition: box-shadow 0.25s, transform 0.25s;
  }

  .skill-card:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .skill-card h3 {
    margin: 0 0 10px;
    font-size: 1.02rem;
  }

  .skill-chips {
    display: flex;
    flex-wrap: wrap;
  }

  .skill-chip {
    background: ${props => props.theme.color.lightblue};
    color: ${props => props.theme.color.primaryDark};
    border-radius: 3px;
    padding: 3px 10px;
    margin: 0 6px 6px 0;
    font-size: 0.85rem;
    font-weight: 600;
  }
`

export const Timeline = styled.div`
  position: relative;
  padding-left: 34px;

  &::before {
    content: "";
    position: absolute;
    left: 9px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: ${props => props.theme.color.secondary};
  }

  .timeline-entry {
    position: relative;
    padding-bottom: ${rhythm(1.5)};
  }

  .timeline-entry:last-child {
    padding-bottom: 0;
  }

  .timeline-dot {
    position: absolute;
    left: -34px;
    top: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 3px solid ${props => props.theme.color.primary};
  }

  .timeline-role {
    margin: 0 0 2px;
    font-size: 1.15rem;
  }

  .timeline-company {
    font-weight: 700;
    color: ${props => props.theme.color.primaryDark};
    margin: 0 0 2px;
  }

  .timeline-period {
    display: block;
    font-size: 0.85rem;
    color: #777;
    margin-bottom: 10px;
  }

  .timeline-points {
    margin: 0;
    padding-left: 20px;
  }

  .timeline-points li {
    margin-bottom: 8px;
    line-height: 1.6;
    color: #333;
  }
`

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${rhythm(1)};
`

export const ProjectCard = styled.a`
  display: block;
  color: inherit;
  box-shadow: none;
  border: 1px solid ${props => props.theme.color.lightgray};
  background: white;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.theme.color.secondary};
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.1);
  }

  .project-media {
    position: relative;
    border-bottom: 1px solid ${props => props.theme.color.lightgray};
  }

  .project-media .gatsby-image-wrapper {
    display: block;
    transition: opacity 0.25s;
  }

  &:hover .project-media .gatsby-image-wrapper {
    opacity: 0.82;
  }

  .project-external {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.55);
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project-body {
    padding: ${rhythm(0.75)} ${rhythm(0.875)};
  }

  .project-category {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${props => props.theme.color.primary};
    font-weight: 700;
  }

  .project-body h3 {
    margin: 4px 0 8px;
    font-size: 1.1rem;
    transition: color 0.25s;
  }

  &:hover .project-body h3 {
    color: ${props => props.theme.color.red};
  }

  .project-blurb {
    margin: 0 0 12px;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.55;
  }

  .project-stack {
    display: flex;
    flex-wrap: wrap;
  }

  .project-stack span {
    font-size: 0.75rem;
    color: #666;
    background: ${props => props.theme.color.lightergray};
    border-radius: 3px;
    padding: 2px 8px;
    margin: 0 5px 5px 0;
  }
`

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${rhythm(1)};

  .service-card {
    border: 1px solid ${props => props.theme.color.lightgray};
    background: white;
    padding: ${rhythm(1.25)} ${rhythm(1)};
    text-align: center;
    transition: box-shadow 0.25s, transform 0.25s;
  }

  .service-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.09);
    transform: translateY(-3px);
  }

  .service-icon {
    color: ${props => props.theme.color.primary};
    margin-bottom: 12px;
  }

  .service-card h3 {
    margin: 0 0 10px;
    font-size: 1.05rem;
  }

  .service-card p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.6;
  }
`

export const ContactSection = styled.section`
  padding-top: ${rhythm(2)};
  padding-bottom: ${rhythm(2)};
  border-top: 1px solid ${props => props.theme.color.lightgray};

  .contact-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${rhythm(1)};
  }

  .contact-card {
    display: flex;
    align-items: flex-start;
    border: 1px solid ${props => props.theme.color.lightgray};
    background: white;
    padding: ${rhythm(1)};
    color: inherit;
    box-shadow: none;
    transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
  }

  a.contact-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.09);
    transform: translateY(-3px);
    border-color: ${props => props.theme.color.secondary};
  }

  .contact-icon {
    color: ${props => props.theme.color.primary};
    margin-right: 14px;
  }

  .contact-card h3 {
    margin: 0 0 4px;
    font-size: 0.98rem;
  }

  .contact-card p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
    word-break: break-word;
  }
`

export const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  border: 2px solid ${props => props.theme.color.primary};
  color: ${props => props.theme.color.primary};
  background: transparent;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 11px 26px;
  margin: 0 14px 14px 0;
  box-shadow: none;
  transition: background 0.25s, color 0.25s;

  &:hover {
    background: ${props => props.theme.color.primary};
    color: white;
  }
`

export const CtaButtonFilled = styled(CtaButton)`
  background: ${props => props.theme.color.primary};
  color: white;

  &:hover {
    background: ${props => props.theme.color.red};
    border-color: ${props => props.theme.color.red};
    color: white;
  }
`

export const SubsectionTitle = styled.h3`
  margin: ${rhythm(1.75)} 0 ${rhythm(0.75)};
  padding-bottom: 8px;
  border-bottom: 1px solid ${props => props.theme.color.lightgray};
`
