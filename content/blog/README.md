# Creating Blog Posts

This directory contains all blog posts for the Tech Blog.

## Structure

Each blog post should be in its own directory:

```
content/blog/
├── my-first-post/
│   ├── index.md
│   └── featured-image.jpg
├── my-second-post/
│   ├── index.md
│   └── hero-image.png
```

## Frontmatter Format

Each `index.md` file should include frontmatter with these fields:

```yaml
---
title: "Your Post Title"              # Required
date: "2024-01-15"                    # Required (YYYY-MM-DD)
description: "Brief description"      # Optional (used for SEO and excerpts)
category: "frontend"                  # Optional (e.g., frontend, backend, mobile, devops, tutorials)
author: "Author Name"                 # Optional
topimage: "./image.jpg"               # Optional (relative path to image)
topimagedesc: "Image alt text"        # Optional
---
```

## Writing Content

After the frontmatter, write your content using standard Markdown:

```markdown
# Heading 1
## Heading 2

Regular paragraph text.

**Bold text** and *italic text*.

- Bullet points
- Are supported

1. Numbered lists
2. Work too

[Links](https://example.com) and images ![]()./image.jpg) work as expected.

\`\`\`javascript
// Code blocks with syntax highlighting
const example = "Hello World";
\`\`\`
```

## Images

- Place images in the same directory as your `index.md` file
- Reference them with relative paths: `./image.jpg`
- Images will be automatically optimized by Gatsby

## Categories

Categories are extracted automatically from all posts. When you add a new category in a post's frontmatter, a category page will be automatically created at `/category/{category-name}`.

## Tips

- Use descriptive directory names - they become the URL slug
- Keep images reasonably sized (under 2MB)
- Include a description for better SEO
- Preview locally with `gatsby develop` before publishing
