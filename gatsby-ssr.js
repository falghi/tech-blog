// Replaces gatsby-plugin-material-ui (no Gatsby v5 release). Collects the
// Material-UI v4 JSS sheets produced while rendering each page and inlines them
// into the head, so server-rendered markup is styled before hydration.
import React from "react"
import { ServerStyleSheets } from "@material-ui/styles"
import postcss from "postcss"
import autoprefixer from "autoprefixer"
import CleanCSS from "clean-css"

const stylesProviderOptions = {
  injectFirst: true,
}

const cleanCSS = new CleanCSS()

// Keyed by pathname because Gatsby renders pages in parallel.
const sheetsByPathname = new Map()

export const wrapRootElement = ({ element, pathname }) => {
  const sheets = new ServerStyleSheets(stylesProviderOptions)
  sheetsByPathname.set(pathname, sheets)
  return sheets.collect(element)
}

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheets = sheetsByPathname.get(pathname)

  if (!sheets) {
    return
  }

  const prefixed = postcss([autoprefixer]).process(sheets.toString(), {
    from: undefined,
  }).css
  const css = cleanCSS.minify(prefixed).styles

  setHeadComponents([
    <style
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: css }}
    />,
  ])

  sheetsByPathname.delete(pathname)
}
