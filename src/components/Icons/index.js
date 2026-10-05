import React from "react"
import GitHubIcon from "@material-ui/icons/GitHub"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import WorkOutlineIcon from "@material-ui/icons/WorkOutline"
import SchoolIcon from "@material-ui/icons/School"
import StarOutlineIcon from "@material-ui/icons/StarOutline"
import CodeIcon from "@material-ui/icons/Code"
import StorageIcon from "@material-ui/icons/Storage"
import TimelineIcon from "@material-ui/icons/Timeline"
import FunctionsIcon from "@material-ui/icons/Functions"
import LanguageIcon from "@material-ui/icons/Language"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"

export const MediumIcon = props => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z" />
  </svg>
)

const registry = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  medium: MediumIcon,
  location: LocationOnIcon,
  work: WorkOutlineIcon,
  school: SchoolIcon,
  star: StarOutlineIcon,
  consult: LanguageIcon,
  code: CodeIcon,
  api: StorageIcon,
  algo: FunctionsIcon,
  external: OpenInNewIcon,
  timeline: TimelineIcon,
}

// Renders a registered icon by name so content data can stay plain data.
export const Icon = ({ name, ...props }) => {
  const Component = registry[name]

  if (!Component) return null

  return <Component {...props} />
}

export default Icon
