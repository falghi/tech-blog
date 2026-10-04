import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoryPage from "../components/CategoryPage"

const CategoryPageTemplate = ({ data, pageContext }) => {
  const categoryName = pageContext.category
  let posts = data.allMarkdownRemark.nodes

  posts.forEach(node => {
    node.excerpt = node.frontmatter.description || node.excerpt
  })
  posts = posts.slice(0, 30)

  const categoryJson = {
    slug: categoryName,
    name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
    desc: `Articles about ${categoryName}`,
  }

  return (
    <Layout>
      <SEO title={categoryJson.name} description={categoryJson.desc} />
      <CategoryPage category={categoryJson} posts={posts} />
    </Layout>
  )
}

export default CategoryPageTemplate

export const pageQuery = graphql`
  query BlogPostByCategory($category: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
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
