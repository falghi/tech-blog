import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

import { theme } from "../components/theme"

Wordpress2016.headerFontFamily = ["Roboto", "Arial", "Helvetica", "sans-serif"]
Wordpress2016.bodyFontFamily = ["Open Sans", "Arial", "Helvetica", "sans-serif"]

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    h1: {
      fontFamily: ["Roboto", "Arial", "Helvetica", "sans-serif"].join(",")
    },
    a: {
      color: theme.color.primary
    }
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
