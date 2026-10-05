require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/blog`,
      name: `blog`,
      ignore: [`**/README.md`],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1200,
            quality: 90,
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  `gatsby-transformer-json`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map(node => {
              return Object.assign({}, node.frontmatter, {
                description: node.frontmatter.description || node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + "/blog" + node.fields.slug,
                guid: site.siteMetadata.siteUrl + "/blog" + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })
            })
          },
          query: `
              {
                allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            `,
          output: "/rss.xml",
          title: "Tech Blog RSS Feed",
          link: process.env.GATSBY_SITE_URL || "https://blog.falghifari.com",
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Tech Blog`,
      short_name: `techblog`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `assets/logo_square.png`,
    },
  },
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-sitemap`,
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
]

// Conditionally add Google Analytics plugin if tracking ID is provided
if (process.env.GATSBY_GA_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GATSBY_GA_TRACKING_ID,
    },
  })
}

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || "",
  siteMetadata: {
    title: `Tech Blog`,
    author: {
      name: `Firdaus Al Ghifari`,
      summary: `Full-stack Software Engineer, Tech Enthusiast.`,
    },
    description: `Firdaus Al Ghifari is a software engineer working on full-stack web development, machine learning, and distributed systems. This is where he writes about it.`,
    siteUrl: process.env.GATSBY_SITE_URL || `https://blog.falghifari.com`,
    social: {
      github: `falghi`,
      linkedin: `alghi`,
    },
  },
  plugins,
}
