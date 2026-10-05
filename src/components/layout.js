import React from "react"
import { ThemeProvider } from "styled-components"
import { ToastContainer } from 'react-toastify'

import Header from "./Header"
import Footer from "./Footer"

import { theme } from "./theme"
import { Styles } from "./layoutCSS"

import "react-toastify/dist/ReactToastify.css";
import "./layout.css"

// `edgeToEdge` drops the container's top padding for pages that open with a
// full-width section carrying its own padding, such as the portfolio hero.
const Layout = ({ children, edgeToEdge = false }) => {
  return (
    <ThemeProvider theme={theme}>
      <Styles>
        <Header />
        <div
          className={`topmost-container${edgeToEdge ? " edge-to-edge" : ""}`}
        >
          <main>{children}</main>
          <Footer />
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Styles>
    </ThemeProvider>
  )
}

export default Layout
