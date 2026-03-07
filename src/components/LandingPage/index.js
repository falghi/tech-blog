import React, { Component } from "react"

import TwoSidedArticleList from "../TwoSidedArticleList"
import RekomendasiArtikel from "../RekomendasiArtikel"
import TrendingArtikel from "../TrendingArtikel"

import { Styles } from "./style"

export default class LandingPage extends Component {
  render() {
    const { posts } = this.props

    const postsRecommend = posts.slice(0, 4)
    const postsTrending = posts.slice(4, 7)
    const postsNewest = posts.slice(7, 15)

    return (
      <Styles>
        <div className="layout">
          {postsRecommend.length > 0 &&
          <>
            <h2 className="lp-small-title">Recommended</h2>
            <RekomendasiArtikel posts={postsRecommend} />
          </>
          }
          {postsTrending.length > 0 &&
          <>
            <h2 className="lp-small-title">Trending</h2>
            <TrendingArtikel posts={postsTrending} />
          </>
          }
          {postsNewest.length > 0 &&
          <>
            <h2 className="lp-small-title">Latest</h2>
            <TwoSidedArticleList posts={postsNewest} />
          </>
          }
        </div>
      </Styles>
    )
  }
}
