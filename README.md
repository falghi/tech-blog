# Portfolio & Tech Blog

A Gatsby 5 site combining a personal portfolio homepage with a tech blog, sharing one
theme, one layout, and one image pipeline.

- `/` — portfolio (hero, about, skills, resume, projects, services, contact)
- `/blog/` — blog index
- `/blog/<post>/` — articles
- `/blog/category/<category>/` — category archives

<p align="center">
  <a href="https://falghifari.com">
    <img src="./assets/tech-blog-demo.gif" alt="Tech Blog Demo" width="100%" />
  </a>
</p>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** package manager - [Install via Corepack](https://pnpm.io/installation) or `npm install -g pnpm`

To check your versions:

```bash
node --version
pnpm --version
```

This project uses pnpm. Enable it without a global install:

```bash
corepack enable pnpm
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tech-blog
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install Gatsby and all required packages including:

- React and React DOM
- Gatsby plugins (image optimization, markdown processing, etc.)
- Material-UI components
- Styled Components
- And more...

`sharp` ships prebuilt binaries for current platforms, including Apple Silicon, so no separate `vips` install is needed. If you change Node versions or the lockfile is ever out of sync, a clean reinstall fixes it:

```bash
rm -rf node_modules
pnpm install
```

Dependency build scripts are allowlisted in `pnpm-workspace.yaml`, so `pnpm install` runs only the native builds Gatsby needs (`sharp`, `lmdb`, `@parcel/watcher`, and so on) and blocks everything else.

### 3. Create Required Directories (First-Time Setup)

Gatsby needs these directories to exist:

```bash
mkdir -p .cache public
```

### 4. Set Up Environment Variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env.development
```

Edit `.env.development` and set:

- `GATSBY_SITE_URL` - Your site URL (e.g., `http://localhost:8000` for development)
- `GATSBY_GA_TRACKING_ID` - Your Google Analytics tracking ID

For production deployment on Netlify, set these variables in your Netlify dashboard under Site settings > Environment variables.

### 5. Start Development Server

```bash
pnpm start
```

or

```bash
pnpm develop
```

Your site will be running at:

- **Local**: `http://localhost:8000`
- **GraphQL Playground**: `http://localhost:8000/___graphql`

The GraphQL playground is a tool you can use to experiment with querying your data. Learn more in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

## 📝 Writing Blog Posts

### Creating a New Post

1. Create a new directory in `content/blog/` with a descriptive name:

   ```bash
   mkdir content/blog/my-awesome-post
   ```

2. Create an `index.md` file inside that directory:

   ```bash
   touch content/blog/my-awesome-post/index.md
   ```

3. Add frontmatter and content to your `index.md`:

   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-15"
   description: "Brief description for SEO"
   category: "health"
   author: "Your Name"
   topimage: "./featured-image.jpg"
   topimagedesc: "Image description for accessibility"
   ---

   Your blog content here...
   ```

4. Add images to the same directory as your markdown file

### Frontmatter Fields

- **title** (required): Post title
- **date** (required): Publication date in YYYY-MM-DD format
- **description** (optional): SEO description and excerpt
- **category** (optional): Used to group posts (e.g., "health", "diet", "nutrition")
- **author** (optional): Author name
- **topimage** (optional): Featured image relative path (e.g., "./image.jpg")
- **topimagedesc** (optional): Alt text for featured image

See `content/blog/README.md` for more detailed instructions.

## 🛠️ Available Commands

### Development

```bash
pnpm start          # Start development server (alias for gatsby develop)
pnpm develop        # Start development server at http://localhost:8000
pnpm clean          # Clear Gatsby cache and build artifacts (useful for troubleshooting)
```

### Production

```bash
pnpm build          # Build production-ready site to /public directory
pnpm serve          # Serve production build locally for testing
```

### Code Formatting

```bash
pnpm format         # Format code with Prettier
```

## 🏗️ Project Structure

```
.
├── content/
│   ├── blog/              # Blog posts in Markdown
│   │   ├── post-1/
│   │   │   ├── index.md
│   │   │   └── images.jpg
│   │   └── post-2/
│   │       └── index.md
│   └── portfolio/
│       └── profile.js     # Portfolio content as data (resume, projects, skills)
├── src/
│   ├── components/
│   │   ├── Portfolio/     # Portfolio sections
│   │   ├── Icons/         # Icon registry shared by data-driven components
│   │   └── ...            # Layout, header, footer, blog components
│   ├── pages/
│   │   ├── index.js       # Portfolio homepage
│   │   ├── blog.js        # Blog index
│   │   └── blog/          # Additional blog pages (privacy policy)
│   ├── templates/         # Post and category templates
│   └── utils/             # Utility functions, including blog path helpers
├── static/                # Static assets
├── assets/                # Images, including assets/portfolio for project shots
├── gatsby-config.js       # Gatsby configuration
├── gatsby-node.js         # Node APIs (page creation)
├── gatsby-browser.js      # Browser APIs (StylesProvider, route updates)
├── gatsby-ssr.js          # SSR APIs (Material-UI JSS collection)
├── pnpm-workspace.yaml    # pnpm settings and build-script allowlist
└── package.json           # Dependencies and scripts
```

## 🎨 Tech Stack

- **Framework**: Gatsby 5 (React-based static site generator)
- **Styling**: styled-components + Material-UI, themed from `src/components/theme.js`
- **Content**: Markdown for blog posts, a data module for portfolio content
- **Typography**: WordPress 2016 theme with Roboto headings and Open Sans body
- **Image Processing**: gatsby-plugin-image + gatsby-plugin-sharp (AVIF/WebP with blurred placeholders)
- **Icons**: Material-UI icons via the registry in `src/components/Icons`
- **Deployment**: GitHub Pages + GitHub Actions

### Adding portfolio content

Portfolio copy lives in `content/portfolio/profile.js`. Project images are read from
`assets/portfolio/` and matched by the `image` field, so adding a project means adding the
file and referencing its path relative to `assets/`.

## 🚢 Deployment

This site is configured to deploy to GitHub Pages automatically via GitHub Actions.

### Initial Setup

1. **Enable GitHub Pages** in your repository:

   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Set up GitHub Secrets** (Settings > Secrets and variables > Actions):

   - `GATSBY_SITE_URL` - The canonical site URL (required), e.g. `https://falghifari.com`.
     Used for RSS, sitemap, and Open Graph metadata.
   - `PATH_PREFIX` - Only needed for GitHub Pages project sites (e.g. `/tech-blog`).
     Leave empty when serving from a custom domain such as `falghifari.com`.
   - `GATSBY_GA_TRACKING_ID` - Your Google Analytics tracking ID (optional, e.g., `UA-164225247-3`)

3. **Push to main branch** - The GitHub Action will automatically build and deploy

### Deployment Types

**User/Organization Site** (username.github.io):

- Repository name must be: `username.github.io`
- Site URL: `https://username.github.io`
- PATH_PREFIX: Leave empty

**Project Site** (username.github.io/repo-name):

- Repository can have any name (e.g., `tech-blog`)
- Site URL: `https://username.github.io/repo-name`
- PATH_PREFIX: `/repo-name` (must match repository name)

### Manual Deployment

To build and deploy manually:

```bash
pnpm deploy
```

## 🐛 Troubleshooting

### Error: ENOENT: no such file or directory, lstat '.cache'

This happens on first-time setup. Create the required directories:

```bash
mkdir -p .cache public
pnpm start
```

### `ERR_PNPM_IGNORED_BUILDS` during install

pnpm blocks dependency build scripts unless they are reviewed. The native
packages this project needs are already allowlisted in `pnpm-workspace.yaml`.
If a new one shows up, review the script and add it:

```bash
pnpm approve-builds
```

### Native module fails to build

Reinstall from scratch:

```bash
rm -rf node_modules
pnpm install
```

### Development server won't start

Try cleaning the Gatsby cache:

```bash
pnpm clean
pnpm start
```

### Changes not showing up

Restart the development server after making configuration changes:

```bash
# Stop the server (Ctrl+C)
pnpm clean
pnpm start
```

### Module not found errors

Reinstall dependencies:

```bash
rm -rf node_modules
pnpm install
```

## 📚 Learn More

- [Gatsby Documentation](https://www.gatsbyjs.org/docs/)
- [Gatsby Tutorial](https://www.gatsbyjs.org/tutorial/)
- [React Documentation](https://reactjs.org/)
- [styled-components Documentation](https://styled-components.com/)

For project-specific documentation, see `CLAUDE.md`.

## 📄 License

All Rights Reserved to Firdaus Al Ghifari.
