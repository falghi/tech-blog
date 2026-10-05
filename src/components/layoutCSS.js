import styled from "styled-components"

import { rhythm } from "../utils/typography"

export const Styles = styled.div`
  .topmost-container {
    padding-top: ${rhythm(1.5)};
    padding-bottom: ${rhythm(1.5)};
  }

  .topmost-container.edge-to-edge {
    padding-top: 0;
  }

  .layout {
    margin-left: auto;
    margin-right: auto;
    max-width: ${rhythm(40)};
    padding-left: ${rhythm(1)};
    padding-right: ${rhythm(1)};
  }

  .genki-two-sides-wrapper {
    display: flex;
  }

  .genki-two-sides-left {
    width: calc(100% - 350px);
  }

  .genki-two-sides-right {
    width: 300px;
    margin-left: 50px;
  }

  .playlist-script {
    font-family: "Playlist Script", "Roboto", "Arial", "Helvetica", "sans-serif";
  }

  .playlist-caps {
    font-family: "Playlist Caps", "Roboto", "Arial", "Helvetica", "sans-serif";
  }

  .Toastify__toast-body {
    text-align: center;
  }

  @media screen and (min-width: 481px) {
    .Toastify__toast {
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 768px) {
    .layout {
      padding-left: ${rhythm(1 / 2)};
      padding-right: ${rhythm(1 / 2)};
    }

    .genki-two-sides-wrapper {
      flex-wrap: wrap;
    }

    .genki-two-sides-left {
      width: 100%;
    }

    .genki-two-sides-right {
      display: none;
    }
  }
`
