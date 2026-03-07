const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String
      date: Date @dateformat
      description: String
      category: String
      author: String
      topimage: File @fileByRelativePath
      topimagedesc: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const CategoryPageTemplate = path.resolve(`./src/templates/category-page.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              category
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.nodes

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create category pages.
  const categories = Array.from(new Set(posts.map(post => post.frontmatter.category).filter(Boolean)))

  categories.forEach((category) => {
    createPage({
      path: `category/${category}`,
      component: CategoryPageTemplate,
      context: {
        category: category
      }
    })
  })
}
