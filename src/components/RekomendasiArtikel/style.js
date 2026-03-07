import styled from "styled-components";

export const Styles = styled.div`
  display: flex;
  padding-top: 1.25rem;
  padding-bottom: 0.75rem;

  .one-recommend {
    width: calc(50% - 10px);
    margin-left: 5px;
    margin-right: 5px;
    color: initial;
    box-shadow: none;
    
    .gatsby-image-wrapper {
      transition: opacity .25s;
    }

    h4 {
      margin-top: 10px;
      letter-spacing: initial;
      text-transform: initial;
      transition: color .25s;
      font-size: 1.1rem;
    }
  }

  .one-recommend:hover {
    .gatsby-image-wrapper {
      opacity: 0.8;
    }

    h4 {
      color: ${props => props.theme.color.red};
    }
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`
