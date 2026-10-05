import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingPage from "../components/LandingPage"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  posts.forEach(node => {
    node.excerpt = node.frontmatter.description || node.excerpt
  })

  return (
    <Layout>
      <SEO
        title="Software Development Blog - Programming Tutorials & Tech Insights"
        description="Notes on software engineering, system design, and web development."
      />
      <LandingPage posts={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM, DD YYYY")
          description
          category
          author
          topimage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 800
                quality: 90
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`
