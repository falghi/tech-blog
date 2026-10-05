import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { Icon } from "../Icons"

import { ProjectCard, ProjectGrid } from "./styles"

const isExternal = to => /^https?:\/\//.test(to)

const Projects = ({ projects }) => (
  <ProjectGrid>
    {projects.map(project => {
      const external = isExternal(project.to)
      const Component = external ? "a" : Link
      const linkProps = external
        ? { href: project.to, target: "_blank", rel: "noopener noreferrer" }
        : { to: project.to }

      return (
        <ProjectCard as={Component} key={project.title} {...linkProps}>
          <div className="project-media">
            {project.image && (
              <GatsbyImage
                image={project.image}
                alt={project.title}
                objectFit="cover"
              />
            )}
            {external && (
              <span className="project-external">
                <Icon name="external" fontSize="small" />
              </span>
            )}
          </div>

          <div className="project-body">
            <div className="project-category">{project.category}</div>
            <h3>{project.title}</h3>
            <p className="project-blurb">{project.blurb}</p>
            <div className="project-stack">
              {project.stack.map(tool => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </ProjectCard>
      )
    })}
  </ProjectGrid>
)

export default Projects
