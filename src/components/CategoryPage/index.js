import React, { Component } from "react"

import TwoSidedArticleList from "../TwoSidedArticleList"

import { Styles } from "./style"

export default class CategoryPage extends Component {
  render() {
    const { category, posts } = this.props

    return (
      <Styles>
        <div className="layout">
          <div className="top-category-page">
            <h1 className="playlist-script">{category.name}</h1>
            <p>{category.desc}</p>
          </div>
          <TwoSidedArticleList posts={posts} />
        </div>
      </Styles>
    )
  }
}
