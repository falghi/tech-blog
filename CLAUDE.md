# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Gatsby 5 site with two halves that share one theme, layout, and image pipeline:

- `/` — personal portfolio (hero, about, skills, resume, projects, services, contact)
- `/blog/` — tech blog, with posts at `/blog/<slug>/` and categories at `/blog/category/<name>/`

Portfolio copy lives in `content/portfolio/profile.js` as data. Blog content is local Markdown.
Deployed on GitHub Pages via GitHub Actions.

**Route prefixes matter.** Blog links must go through `src/utils/paths.js` (`blogPath`,
`categoryPath`) rather than being hand-built, so the `/blog` prefix stays in one place.

## Development Commands

### Core Development

- `pnpm develop` - Start development server at `http://localhost:8000`
- `pnpm start` - Alias for `pnpm develop`
- `pnpm build` - Build production site
- `pnpm serve` - Serve production build locally
- `pnpm clean` - Clear Gatsby cache and build artifacts (useful for troubleshooting build issues)
- `pnpm format` - Format code with Prettier

### Package Manager

This project uses **pnpm** (see `packageManager` in `package.json`). Always use
`pnpm install` / `pnpm add` rather than npm, so `pnpm-lock.yaml` stays authoritative.
`pnpm-workspace.yaml` allowlists the dependency build scripts that may run, and sets
`shamefullyHoist` because Gatsby resolves some of its own runtime deps from the project root.

### GraphQL Playground

Development server includes GraphiQL at `http://localhost:8000/___graphql` for testing GraphQL queries.

## Architecture

### Content Management

The site uses **local Markdown files** for content management. Blog posts are stored in `content/blog/` directory.

**Content Structure:**

- Blog posts are located in `content/blog/`
- Each post is in its own directory: `content/blog/post-name/index.md`
- Images for posts should be placed in the same directory as the markdown file

**Markdown Frontmatter:**
Required and optional fields for blog posts:

```yaml
---
title: "Post Title" # Required
date: "2024-01-15" # Required (YYYY-MM-DD format)
description: "Post description" # Optional, falls back to excerpt
category: "health" # Optional, used for category pages
author: "Author Name" # Optional
topimage: "./image.jpg" # Optional, relative path to image
topimagedesc: "Image description" # Optional
---
```

### Page Generation (gatsby-node.js)

Gatsby programmatically creates pages at build time:

**Slug Creation:**

- `onCreateNode` hook creates slug fields from file paths using `gatsby-source-filesystem`
- Slugs are automatically generated from directory names (e.g., `content/blog/my-post/` → `/my-post/`)

**Page Creation:**

1. **Blog Post Pages** - Created from `allMarkdownRemark` query

   - Path: `/blog/{slug}` (auto-generated from folder name, prefixed via `blogPath`)
   - Template: `src/templates/blog-post.js`
   - The page context passes the **unprefixed** slug, since the template queries on it
   - Includes previous/next post navigation context

2. **Category Pages** - Dynamically created from unique category values in frontmatter
   - Path: `/blog/category/{category}` (via `categoryPath`)
   - Template: `src/templates/category-page.js`
   - Categories are extracted from all posts' frontmatter

3. **Portfolio Homepage** - `src/pages/index.js` is a file-based page at `/`
4. **Blog Index** - `src/pages/blog.js` is a file-based page at `/blog/`

### Component Structure

**Core Layout:**

- `src/components/layout.js` - Main layout wrapper with Header, Footer, and ToastContainer
- Uses `styled-components` with ThemeProvider for consistent theming
- Theme defined in `src/components/theme.js` with color palette

**Key Page Components:**

- `LandingPage` - Blog index rendering with post listings
- `BlogPostPage` - Individual blog post display
- `CategoryPage` - Category-specific article listings

**Portfolio Components** (`src/components/Portfolio/`):

- `Hero`, `About`, `Skills`, `Timeline`, `Projects`, `Services`, `Contact`, `BlogTeaser`
- `styles.js` holds the shared styled-components, so both halves stay visually consistent
- Content comes from `content/portfolio/profile.js`; project images resolve from
  `assets/portfolio/` by relative path

**Shared Components:**

- `Header` - Navigation header. Exports `navData` (site-wide) and `blogNavData`
  (blog categories, only rendered while under `/blog`)
- `Footer` - Site footer
- `Icons` - Icon registry keyed by name, so data files can reference icons without imports
- `TrendingArtikel`, `RekomendasiArtikel`, `TwoSidedArticleList` - Article listings
- `Bios` - Author biography components
- `SEO` - SEO metadata management

### Styling Approach

- Primary: `styled-components` for component-level styling
- Material-UI v4 is used for a few primitives (drawer, breadcrumbs). It has no Gatsby 5
  plugin, so JSS collection happens in `gatsby-ssr.js`
- All colors come from `src/components/theme.js`; `primaryDark` exists for text that needs
  contrast against white, since `primary` (#00bcd4) fails AA on white for small text
- Typography system using `typography-theme-wordpress-2016`
- Global styles in `src/components/layout.css`

### Data Flow Pattern

1. Content authored as Markdown files in `content/blog/` directory
2. `gatsby-source-filesystem` reads markdown files at build time
3. `gatsby-transformer-remark` transforms markdown into queryable nodes
4. GraphQL queries in page templates/components access processed content
5. Markdown converted to HTML and rendered on pages
6. Images processed through `gatsby-plugin-sharp` for optimization

### Common GraphQL Query Pattern

```javascript
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        html
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
```

**Query Individual Post:**

```javascript
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      date(formatString: "MMMM, DD YYYY")
      description
      category
    }
  }
}
```

### Important Implementation Details

**Excerpt Handling:**
Posts use either explicit `frontmatter.description` or fallback to auto-generated `excerpt` for summaries. This pattern appears in multiple places (feed generation, templates, landing page).

**Image Optimization:**

- Local images processed through `gatsby-plugin-sharp` and `gatsby-plugin-image`
- Images should be placed in the same directory as the blog post markdown file
- Query `gatsbyImageData` on `childImageSharp`, then render with `GatsbyImage` from `gatsby-plugin-image` (see `src/components/fluidimg.js`). The old `fluid` field and `GatsbyImageSharpFluid` fragment are Gatsby v2 APIs and no longer exist.
- Images referenced in frontmatter as relative paths (e.g., `./image.jpg`)

**Material-UI SSR:**

- `gatsby-plugin-material-ui` has no Gatsby v5 release. `gatsby-ssr.js` collects the v4 JSS sheets per pathname and inlines them into a `<style id="jss-server-side">`; `gatsby-browser.js` wraps the tree in `StylesProvider` and removes that tag after hydration. If you add a new root-level API, keep both sides in sync.

**RSS Feed:**
Auto-generated at `/rss.xml` using `gatsby-plugin-feed` with all blog posts. Item URLs are
prefixed with `/blog` in `gatsby-config.js`.

**Hydration Constraints (React 18):**
- Never read `window` during render. The header gets the current path from
  `src/utils/pathname.js`, which `gatsby-browser.js` updates in `onRouteUpdate`
- Do not wrap `GatsbyImage` (a `<div>`) in a `<p>`; browsers close the `<p>` early and
  hydration fails with error #418
- Anchor links to `/#section` are scrolled in `onRouteUpdate` after the route settles

## Environment Variables

The site uses environment variables for configuration. Copy `.env.example` to `.env.development` and update values accordingly.

**Required Variables:**

- `GATSBY_SITE_URL` - Canonical site URL (e.g., `https://falghifari.com`). Used for RSS and sitemap.
- `PATH_PREFIX` - Path prefix for GitHub Pages project sites (e.g., `/tech-blog`). Leave empty for user/org sites or custom domains.

**Optional Variables:**

- `GATSBY_GA_TRACKING_ID` - Google Analytics tracking ID (e.g., `UA-164225247-3`). If not set, Google Analytics will be disabled.

**Setup:**

```bash
# For development
cp .env.example .env.development

# For production (GitHub Pages)
# Set secrets in GitHub repository: Settings > Secrets and variables > Actions
```

**Note:** Gatsby requires variables prefixed with `GATSBY_` to be available in browser-side code.

## Deployment

Site deploys to GitHub Pages automatically via GitHub Actions when code is pushed to the `main` branch.

**GitHub Pages Setup:**

1. Enable GitHub Pages: Settings > Pages > Build and deployment > Source: GitHub Actions
2. Add repository secrets (Settings > Secrets and variables > Actions):
   - `GATSBY_SITE_URL` - Canonical site URL (required), e.g. `https://falghifari.com`
   - `PATH_PREFIX` - Only for project sites (e.g., `/repo-name`)
   - `GATSBY_GA_TRACKING_ID` - Your Google Analytics tracking ID (optional)

**Deployment Types:**

- **User/Org site** (`username.github.io`): No PATH_PREFIX needed
- **Project site** (`username.github.io/repo-name`): Set PATH_PREFIX to `/repo-name`

**Workflow File:** `.github/workflows/deploy.yml` handles automated builds and deployments, using pnpm with a frozen lockfile.

## Analytics

Google Analytics tracking is optional and configured via `gatsby-plugin-google-analytics`. The plugin is only enabled when the `GATSBY_GA_TRACKING_ID` environment variable is set. If not configured, the site will build and deploy without analytics.
