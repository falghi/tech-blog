import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../components/Portfolio/About"
import BlogTeaser from "../components/Portfolio/BlogTeaser"
import Contact from "../components/Portfolio/Contact"
import Hero from "../components/Portfolio/Hero"
import Projects from "../components/Portfolio/Projects"
import Services from "../components/Portfolio/Services"
import Skills from "../components/Portfolio/Skills"
import TimelineList from "../components/Portfolio/Timeline"
import { Icon } from "../components/Icons"
import { SubsectionTitle, Section } from "../components/Portfolio/styles"

import {
  education,
  experience,
  leadership,
  profile,
  projects,
  services,
  skillGroups,
} from "../../content/portfolio/profile"

const PortfolioPage = ({ data }) => {
  const posts = data.recentPosts.nodes

  // Attach each project's optimized image to its content entry.
  const projectsWithImages = projects.map(project => {
    const node = data.projectImages.nodes.find(
      image => image.relativePath === project.image
    )

    return {
      ...project,
      image: node ? node.childImageSharp.gatsbyImageData : null,
    }
  })

  return (
    <Layout>
      <SEO
        title="Firdaus Al Ghifari - Software Engineer"
        description={profile.summary}
      />

      <Hero profile={profile} />

      <Section id="about">
        <div className="layout">
          <span className="section-eyebrow">About</span>
          <h2 className="section-title">Let me introduce myself.</h2>
          <p className="section-lead">{profile.summary}</p>
        </div>

        <About portrait={data.portfolioPortrait} profile={profile} />

        <div className="layout" style={{ marginTop: "2.5rem" }}>
          <SubsectionTitle>Skills</SubsectionTitle>
          <Skills groups={skillGroups} />
        </div>
      </Section>

      <Section className="alt-surface" id="resume">
        <div className="layout">
          <span className="section-eyebrow">Resume</span>
          <h2 className="section-title">More of my credentials.</h2>

          <SubsectionTitle>
            <Icon
              name="work"
              fontSize="small"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Work Experience
          </SubsectionTitle>
          <TimelineList entries={experience} />

          <SubsectionTitle>
            <Icon
              name="school"
              fontSize="small"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Leadership &amp; Projects
          </SubsectionTitle>
          <TimelineList entries={leadership} />

          <SubsectionTitle>
            <Icon
              name="school"
              fontSize="small"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Education
          </SubsectionTitle>
          <TimelineList entries={education} />
        </div>
      </Section>

      <Section id="projects">
        <div className="layout">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">Check out some of my works.</h2>
          <p className="section-lead">
            Products and platforms I have helped design, build, and ship.
          </p>
          <Projects projects={projectsWithImages} />
        </div>
      </Section>

      <Section className="alt-surface" id="services">
        <div className="layout">
          <span className="section-eyebrow">Services</span>
          <h2 className="section-title">What can I do for you?</h2>
          <Services services={services} />
        </div>
      </Section>

      <Contact profile={profile} />

      <BlogTeaser posts={posts} />
    </Layout>
  )
}

export default PortfolioPage

export const pageQuery = graphql`
  {
    portfolioPortrait: file(
      relativePath: { eq: "portfolio/profile-pic-v2.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 320
          quality: 85
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }

    recentPosts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        excerpt(pruneLength: 110)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM, DD YYYY")
          description
          category
          topimage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 600
                quality: 80
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }

    projectImages: allFile(
      filter: {
        sourceInstanceName: { eq: "assets" }
        extension: { regex: "/(jpg|jpeg|png|webp)/" }
      }
    ) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 640
            height: 400
            quality: 80
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`
