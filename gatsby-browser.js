// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"

import React from "react"
import { StylesProvider } from "@material-ui/styles"

import { setPathname } from "./src/utils/pathname"

export const wrapRootElement = ({ element }) => (
  <StylesProvider injectFirst>{element}</StylesProvider>
)

// Feeds the header's active-link state on both the first render and every
// client-side navigation.
export const onRouteUpdate = ({ location }) => {
  setPathname(location.pathname)
}

export const onInitialClientRender = () => {
  // In develop, JSS keeps the client sheets, so leave the SSR sheet in place.
  if (process.env.NODE_ENV === "development") {
    return
  }

  // JSS re-injects the styles on the client, drop the server-rendered copy.
  const jssStyles = document.querySelector("#jss-server-side")

  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles)
  }
}
