import styled, { keyframes } from "styled-components"

const stickyheaderDown = keyframes`
  from {bottom: 200px;}
  to {bottom: 0;}
`

const stickyheaderUp = keyframes`
  from {bottom: 0;}
  to {bottom: 200px;}
`

const zIndexBack = keyframes`
  0% {z-index: 1;}
  99% {z-index: 1;}
  100% {z-index: -1;}
`

export const Styles = styled.header`
  .topmost-navigation {
    .logo-top-mid {
      max-width: 400px;
      width: 60%;
      margin: auto;
    }
  }

  .topmost-nav-part {
    display: flex;
    align-items: center;

    .button-drawer {
      width: 80px;
      margin-left: 18px;
    }

    .social-media {
      width: 80px;
      margin-right: 30px;
      text-align: right;

      a {
        color: black;
        box-shadow: none;
        padding-left: 4px;
        padding-right: 4px;
        padding-top: 8.5px;
        display: inline-block;
        transition: color 0.25s;
      }

      a:hover {
        color: ${props => props.theme.color.primary};
      }
    }
  }

  .all-nav-contents {
    background: white;
  }

  .navbar-lists {
    text-align: center;
    border-top: 1px solid ${props => props.theme.color.lightgray};
    border-bottom: 1px solid ${props => props.theme.color.lightgray};
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    a {
      box-shadow: none;
      color: initial;
      padding: 3px 1px;
      margin-left: 16px;
      margin-right: 16px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.5s;
    }

    a:hover {
      border-color: ${props => props.theme.color.red};
    }

    .MuiButton-root {
      text-transform: none;
      font-size: 1rem;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .blog-nav-lists {
    text-align: center;
    background: ${props => props.theme.color.lightblue};
    padding-top: 7px;
    padding-bottom: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    a {
      box-shadow: none;
      color: ${props => props.theme.color.primaryDark};
      font-size: 0.88rem;
      font-weight: 600;
      padding: 2px 1px;
      margin-left: 14px;
      margin-right: 14px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.25s, color 0.25s;
    }

    a:hover {
      border-color: ${props => props.theme.color.primary};
    }

    a.active {
      border-color: ${props => props.theme.color.primary};
      color: ${props => props.theme.color.red};
    }
  }

  .all-nav-contents {
    .logo-top-mid {
      max-width: 200px;
      width: 60%;
      margin: auto;
      display: none;
    }
  }

  .sticky-wrapper {
    position: relative;

    .sticky-contents {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: -1;
    }

    .all-nav-contents {
      position: relative;
      bottom: 200px;
    }

    .logo-top-mid {
      display: block;
    }
  }

  .sticky-wrapper .sticky-back {
    z-index: 1;
    animation-name: ${zIndexBack};
    animation-duration: 1s;
    animation-fill-mode: forwards;

    .all-nav-contents {
      animation-name: ${stickyheaderUp};
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
  }

  .sticky {
    position: sticky;
    top: 0;
    z-index: 104;

    .all-nav-contents {
      animation-name: ${stickyheaderDown};
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
  }

  @media screen and (max-width: 500px) {
    .topmost-nav-part .social-media {
      margin-right: 15px;

      a {
        padding-left: 2px;
        padding-right: 2px;
      }
    }

    .navbar-lists,
    .blog-nav-lists {
      display: none;
    }
  }
`
