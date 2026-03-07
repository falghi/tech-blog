import styled from "styled-components";

export const Styles = styled.div`
  display: flex;
  padding-top: 1.25rem;
  padding-bottom: 1.75rem;

  .trending-side-left {
    width: calc(50% - 40px);
    margin-right: 40px;

    .first-trending-img {
      margin-top: 5px;
      transition: opacity .25s;
    }

    .first-trending-img:hover {
      opacity: 0.8;
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

    .article-box-desc {
      color: initial;
      margin-top: 15px;
    }

    .small-article-desc {
      margin-bottom: 15px;
    }
  }

  .trending-side-right {
    width: 50%;

    .article-box {
      margin-bottom: 2.5rem;
    }

    .small-article-desc {
      margin-bottom: 0;
    }
  }

  .trending-mobile {
    display: none;
  }

  .read-more {
    display: none;
  }

  @media screen and (max-width: 1150px) {
    .trending-side-left {
      width: calc(45% - 40px);
    }

    .trending-side-right {
      width: 55%;
    }
  }

  @media screen and (min-width: 1024.02px) {
    .trending-side-right {
      h2 {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .trending-side-left {
      padding-left: 0;
      padding-right: 9px;
      margin-right: 0;
      width: calc(33% + 9px);

      .first-trending-img {
        margin-top: 0;
      }
    }

    .trending-side-right {
      display: flex;
      width: calc(66% + 27px);

      .small-article-desc {
        margin-bottom: 15px;
      }
    }

    .trending-side-right > div {
      padding-left: 9px;
      padding-right: 9px;
    }

    .trending-side-right > div:last-of-type {
      padding-right: 0;
    }

    .trending-desktop {
      display: none;
    }

    .read-more {
      display: block;
    }
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    
    .trending-side-left {
      padding-left: 0;
      padding-right: 0;
      width: 100%;
      margin-bottom: 2.5rem;
    }

    .trending-side-right {
      display: block;
      width: 100%;

      .small-article-desc {
        margin-bottom: 15px;
      }
    }

    .trending-side-right > div {
      padding-left: 0;
      padding-right: 0;
    }
  }
`
