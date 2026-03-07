
<p align="center">
  <a href="https://blog.falghifari.com">
    <img alt="Blog Logo" src="./assets/logo_white_bg_cropped.png" width="80%" style="border-radius: 16px;" />
  </a>
</p>

# Tech Blog

A Gatsby-based tech blog built with React, styled-components, and local Markdown files for content management.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 12 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)

To check if you have Node.js installed:
```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tech-blog
```

### 2. Install Dependencies

```bash
npm install
```

This will install Gatsby and all required packages including:
- React and React DOM
- Gatsby plugins (image optimization, markdown processing, etc.)
- Material-UI components
- Styled Components
- And more...

**Note for Apple Silicon (M1/M2/M3) users**: If you encounter errors about `sharp` or `vips`, run:
```bash
brew install vips
rm -rf node_modules package-lock.json
npm install
```

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
npm start
```

or

```bash
gatsby develop
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
npm start          # Start development server (alias for gatsby develop)
gatsby develop     # Start development server at http://localhost:8000
gatsby clean       # Clear Gatsby cache and build artifacts (useful for troubleshooting)
```

### Production
```bash
npm run build      # Build production-ready site to /public directory
gatsby serve       # Serve production build locally for testing
```

### Code Formatting
```bash
npm run format     # Format code with Prettier
```

## 🏗️ Project Structure

```
.
├── content/
│   └── blog/              # Blog posts in Markdown
│       ├── post-1/
│       │   ├── index.md
│       │   └── images.jpg
│       └── post-2/
│           └── index.md
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── templates/        # Post and category templates
│   └── utils/            # Utility functions
├── static/               # Static assets
├── assets/               # Images and other assets
├── gatsby-config.js      # Gatsby configuration
├── gatsby-node.js        # Node APIs (page creation)
└── package.json          # Dependencies and scripts
```

## 🎨 Tech Stack

- **Framework**: Gatsby (React-based static site generator)
- **Styling**: styled-components + Material-UI
- **Content**: Local Markdown files
- **Typography**: WordPress 2016 theme
- **Image Processing**: gatsby-plugin-sharp
- **Deployment**: GitHub Pages + GitHub Actions

## 🚢 Deployment

This site is configured to deploy to GitHub Pages automatically via GitHub Actions.

### Initial Setup

1. **Enable GitHub Pages** in your repository:
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Set up GitHub Secrets** (Settings > Secrets and variables > Actions):
   - `GATSBY_SITE_URL` - Your GitHub Pages URL (required):
     - For `username.github.io` (user/org site): `https://username.github.io`
     - For `username.github.io/repo-name` (project site): `https://username.github.io/repo-name`
   - `PATH_PREFIX` - Only needed for project sites (e.g., `/tech-blog`). Leave empty for user/org sites.
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
npm run deploy
```

## 🐛 Troubleshooting

### Error: ENOENT: no such file or directory, lstat '.cache'
This happens on first-time setup. Create the required directories:

```bash
mkdir -p .cache public
npm start
```

### Sharp installation fails on Apple Silicon (M1/M2/M3)
If you see errors about `sharp` or `vips` during `npm install`:

```bash
# Install vips library via Homebrew
brew install vips

# Clean up and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Development server won't start
Try cleaning the Gatsby cache:
```bash
gatsby clean
npm start
```

### Changes not showing up
Restart the development server after making configuration changes:
```bash
# Stop the server (Ctrl+C)
gatsby clean
npm start
```

### Module not found errors
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [Gatsby Documentation](https://www.gatsbyjs.org/docs/)
- [Gatsby Tutorial](https://www.gatsbyjs.org/tutorial/)
- [React Documentation](https://reactjs.org/)
- [styled-components Documentation](https://styled-components.com/)

For project-specific documentation, see `CLAUDE.md`.

## 📄 License

All Rights Reserved to Firdaus Al Ghifari.
