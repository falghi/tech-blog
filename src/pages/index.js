import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingPage from "../components/LandingPage"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  posts.forEach((node) => {
    node.excerpt = node.frontmatter.description || node.excerpt
  })

  return (
    <Layout>
      <SEO title="Software Development Blog - Programming Tutorials & Tech Insights" />
      <LandingPage posts={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
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
              fluid(maxWidth: 800, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
