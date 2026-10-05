import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <div className="layout">
        <h1 style={{ marginTop: 0 }}>Page not found</h1>
        <p>
          That route doesn&apos;t exist. It may have been moved or renamed.
        </p>
        <p>
          <Link to="/">Back to the portfolio</Link> or{" "}
          <Link to="/blog/">browse the blog</Link>.
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
