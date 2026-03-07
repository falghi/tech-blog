import React, { Component } from "react"

import SmallArticle from "./SmallArticle"

import { Styles } from "./style"

export default class TwoSidedArticleList extends Component {
  render() {
    const { posts } = this.props

    return (
      <Styles>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {posts.map((node, idx) => <SmallArticle key={idx} node={node} /> )}
        </div>
      </Styles>
    )
  }
}
