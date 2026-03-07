import React, { Component, createRef } from 'react'
import { Link } from "gatsby"

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

import Image from '../image'

import { Styles } from "./style"

export const navData = [
  {
    to: "/",
    name: "Home"
  },
  {
    to: "/category/frontend/",
    name: "Frontend"
  },
  {
    to: "/category/backend/",
    name: "Backend"
  },
]

const MediumIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" style={{ padding: '3px', borderRadius: '5px', boxSizing: 'border-box' }}>
    <title>Medium icon</title>
    <path fill="currentColor" d="M0 0v24h24V0H0zm19.938 5.686L18.651 6.92a.376.376 0 0 0-.143.362v9.067a.376.376 0 0 0 .143.361l1.257 1.234v.271h-6.322v-.27l1.302-1.265c.128-.128.128-.165.128-.36V8.99l-3.62 9.195h-.49L6.69 8.99v6.163a.85.85 0 0 0 .233.707l1.694 2.054v.271H3.815v-.27L5.51 15.86a.82.82 0 0 0 .218-.707V8.027a.624.624 0 0 0-.203-.527L4.019 5.686v-.27h4.674l3.613 7.923 3.176-7.924h4.456v.271z"/>
  </svg>
)

const sosmedList = [
  {
    to: "https://www.linkedin.com/in/alghi",
    logo: <LinkedInIcon />
  },
  {
    to: "https://medium.com/@firdaus.alghifari",
    logo: <MediumIcon />
  }
]

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false,
      isBackSticky: false,
      isDrawerOpen: false
    }
    this.ref = createRef()
  }
    
  handleScroll = () => {
    if (this.ref.current) {
      console.log(this.ref.current.getBoundingClientRect().top)
      if (!(this.ref.current.getBoundingClientRect().top < 0) && this.state.isSticky) {
        this.setState({ isBackSticky: true, isSticky: false })
      } else if (this.ref.current.getBoundingClientRect().top < 0) {
        this.setState({ isBackSticky: false, isSticky: true })
      }
    }
  }

  setDrawer = (condition) => () => {
    this.setState({
      isDrawerOpen: condition
    })
  }

  componentDidMount() {
    typeof window !== "undefined" && window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    typeof window !== "undefined" && window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { isSticky, isBackSticky, isDrawerOpen } = this.state

    let pathname = typeof window !== "undefined" ? window.location.pathname : ""
    if (!pathname.endsWith("/")) pathname += "/"

    const topmostPart = (
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
            <Image imgName="logo_white_bg_cropped.png" alt="Logo Genki Food" />
          </Link>
        </div>
        <div className="social-media">
          {
            sosmedList.map(({ to, logo }, index) => (
              <a href={to} key={index} target="_blank" rel="noopener noreferrer">
                {logo}
              </a>
            ))
          }
        </div>
      </div>
    )

    const navLists = (
      <div className="navbar-lists">
        {navData.map(({ to, name }, idx) => (
          <Link
            style={to === pathname ? { fontWeight: "bold" } : {}}
            key={idx}
            to={to}
          >
            {name}
          </Link>
        ))}
      </div>
    )

    return (
      <Styles>
        <div className="topmost-navigation">
          {topmostPart}
        </div>
        {navLists}
        <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={this.ref}>
          <div className={`sticky-contents${isBackSticky ? ' sticky-back' : ''}`}>
            <div className="all-nav-contents">
              {topmostPart}
              {navLists}
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
                to={to} key={index} style={{ color: "black" }}
                className={to === pathname ? "active" : ""}
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
