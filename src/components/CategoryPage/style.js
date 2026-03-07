import styled from "styled-components";

export const Styles = styled.div`
  .top-category-page {
    text-align: center;
    border: 1px solid ${props => props.theme.color.lightgray};
    padding-top: 2rem;
    padding-left: 12px;
    padding-right: 12px;

    h1 {
      margin-top: 0;
    }
  }

  @media screen and (min-width: 768px) {
    .top-category-page {
      h1 {
        font-size: 3.5rem;
      }
    }
  }
`
