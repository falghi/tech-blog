import React, { Component, createRef } from "react"
import { Link } from "gatsby"

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import LinkedInIcon from "@material-ui/icons/LinkedIn"

import Image from "../image"

import { getPathname, subscribePathname } from "../../utils/pathname"

import { Styles } from "./style"

export const navData = [
  {
    to: "/",
    name: "Home",
  },
  {
    to: "/blog/",
    name: "Blog",
  },
  {
    to: "/#resume",
    name: "Resume",
  },
  {
    to: "/#projects",
    name: "Projects",
  },
  {
    to: "/#contact",
    name: "Contact",
  },
]

export const blogNavData = [
  {
    to: "/blog/",
    name: "All Articles",
  },
  {
    to: "/blog/category/frontend/",
    name: "Frontend",
  },
  {
    to: "/blog/category/backend/",
    name: "Backend",
  },
  {
    to: "/blog/category/system-design/",
    name: "System Design",
  },
]

const MediumIcon = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    style={{ padding: "3px", borderRadius: "5px", boxSizing: "border-box" }}
  >
    <title>Medium icon</title>
    <path
      fill="currentColor"
      d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z"
    />
  </svg>
)

const sosmedList = [
  {
    to: "https://www.linkedin.com/in/alghi",
    logo: <LinkedInIcon />,
  },
  {
    to: "https://medium.com/@firdaus.alghifari",
    logo: <MediumIcon />,
  },
]

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false,
      isBackSticky: false,
      isDrawerOpen: false,
      // Stays "/" for SSR and the first client render so hydration matches.
      // The real value is applied in componentDidMount, then kept current by
      // onRouteUpdate.
      pathname: "/",
    }
    this.ref = createRef()
    this.unsubscribePathname = null
  }

  handleScroll = () => {
    if (this.ref.current) {
      console.log(this.ref.current.getBoundingClientRect().top)
      if (
        !(this.ref.current.getBoundingClientRect().top < 0) &&
        this.state.isSticky
      ) {
        this.setState({ isBackSticky: true, isSticky: false })
      } else if (this.ref.current.getBoundingClientRect().top < 0) {
        this.setState({ isBackSticky: false, isSticky: true })
      }
    }
  }

  setDrawer = condition => () => {
    this.setState({
      isDrawerOpen: condition,
    })
  }

  componentDidMount() {
    // Safe to touch window here: this runs after hydration has matched.
    this.setState({ pathname: getPathname() })
    this.unsubscribePathname = subscribePathname(pathname =>
      this.setState({ pathname })
    )

    typeof window !== "undefined" &&
      window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    if (this.unsubscribePathname) {
      this.unsubscribePathname()
    }

    typeof window !== "undefined" &&
      window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    const { isSticky, isBackSticky, isDrawerOpen, pathname } = this.state

    const topmostPart = imgName => (
      <div className="topmost-nav-part">
        <div className="button-drawer">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className="logo-top-mid">
          <Link to="/">
            <Image imgName={imgName} alt="Blog Logo" />
          </Link>
        </div>
        <div className="social-media">
          {sosmedList.map(({ to, logo }, index) => (
            <a href={to} key={index} target="_blank" rel="noopener noreferrer">
              {logo}
            </a>
          ))}
        </div>
      </div>
    )

    const inBlog = pathname.startsWith("/blog")

    // Anchor links point at the portfolio homepage, so they are only "current"
    // on that page.
    const isCurrent = to => {
      if (to.includes("#")) return pathname === "/"
      if (to === "/blog") return inBlog
      return pathname === to || pathname === `${to}/`
    }

    const navLists = (
      <div className="navbar-lists">
        {navData.map(({ to, name }, idx) => (
          <Link
            style={isCurrent(to) ? { fontWeight: "bold" } : {}}
            key={idx}
            to={to}
          >
            {name}
          </Link>
        ))}
      </div>
    )

    const blogNavLists = inBlog && (
      <div className="blog-nav-lists">
        {blogNavData.map(({ to, name }, idx) => (
          <Link key={idx} to={to} className={isCurrent(to) ? "active" : ""}>
            {name}
          </Link>
        ))}
      </div>
    )

    return (
      <Styles>
        <div className="topmost-navigation">
          {topmostPart("logo_white_bg_long.png")}
        </div>
        {navLists}
        {blogNavLists}
        <div
          className={`sticky-wrapper${isSticky ? " sticky" : ""}`}
          ref={this.ref}
        >
          <div
            className={`sticky-contents${isBackSticky ? " sticky-back" : ""}`}
          >
            <div className="all-nav-contents">
              {topmostPart("logo_square_long.png")}
              {navLists}
              {blogNavLists}
            </div>
          </div>
        </div>
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={this.setDrawer(false)}
          onOpen={this.setDrawer(false)}
        >
          <div>
            <IconButton onClick={this.setDrawer(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {navData.map(({ to, name }, index) => (
              <Link
                to={to}
                key={index}
                style={{ color: "black" }}
                className={isCurrent(to) ? "active" : ""}
              >
                <ListItem button>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            ))}
            <Divider />
            {inBlog &&
              blogNavData.map(({ to, name }, index) => (
                <Link
                  to={to}
                  key={index}
                  style={{ color: "black" }}
                  className={isCurrent(to) ? "active" : ""}
                >
                  <ListItem button>
                    <ListItemText primary={name} />
                  </ListItem>
                </Link>
              ))}
          </List>
        </SwipeableDrawer>
      </Styles>
    )
  }
}

export default Header
