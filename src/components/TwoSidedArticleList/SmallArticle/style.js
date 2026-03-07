import styled from "styled-components"
import { rhythm } from "../../../utils/typography"

export const Styles = styled.div`
  .article-box {
    color: initial;
    display: flex;
    margin-bottom: ${rhythm(2)};
  }

  .article-box-image {
    width: 300px;
    margin-right: 25px;
    transition: opacity .25s;
    margin-top: 5px;
  }

  .article-box-image:hover {
    opacity: 0.8;
  }

  .article-box-desc {
    width: calc(100% - 325px);
  }

  .article-box-title, .read-more {
    transition: color .25s;
  }

  .article-box-title:hover, .read-more:hover {
    color: ${props => props.theme.color.red};
  }

  .read-more {
    color: ${props => props.theme.color.primary};
    font-weight: bold;
  }

  @media screen and (max-width: 1024px) {
    .article-box {
      flex-wrap: wrap;
    }

    .article-box-image {
      width: 100%;
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 15px;
    }

    .article-box-desc {
      width: 100%;
    }

    .small-article-desc {
      margin-bottom: 15px;
    }
  }
`
