import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { toast } from 'react-toastify'

import Button from "../Button"

import { rhythm } from "../../utils/typography"
import { subscribeEmail } from "../../services/auth"

const Styles = styled.div`
  text-align: center;
  background-color: ${props => props.theme.color.lightblue};
  padding-top: ${rhythm(2.5)};
  padding-bottom: ${rhythm(1.5)};
  padding-left: 20px;
  padding-right: 20px;

  h2 {
    margin-top: 0;
    color: ${props => props.theme.color.primary};
  }

  .form-subscribe {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .MuiTextField-root {
      max-width: 275px;
      width: 100%;
    }

    .MuiOutlinedInput-root {
      border-radius: 0;
      background-color: white;
    }

    .MuiFormLabel-root.Mui-focused {
      color: ${props => props.theme.color.primary};
    }

    .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.color.primary};
    }

    .MuiFormLabel-root.Mui-focused.Mui-error {
      color: ${props => props.theme.color.red};
    }

    .MuiInput-underline.Mui-error:after {
      border-bottom-color: ${props => props.theme.color.red};
    }

    button {
      height: 56px;
      margin-left: 10px;
    }
  }

  .form-subscribe > * {
    margin-bottom: 10px;
  }
`

export default class SubscribeSection extends Component {
  state = {
    email: "",
    emailError: false,
    loading: false
  }

  setEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  submitSubscribe = (e) => {
    e.preventDefault()
    const { email } = this.state
    this.setState({ loading: true })

    subscribeEmail(email).then(success => {
      if (success) {
        toast.success("Sign up berhasil!")
        this.setState({
          email: "",
          emailError: false,
          loading: false
        })
      } else {
        toast.error("Email tidak valid")
        this.setState({
          emailError: true,
          loading: false
        })
      }
    }).catch(() => {
      toast.error("Sign up gagal")
      this.setState({
        emailError: true,
        loading: false
      })
    })
  }

  render() {
    const { email, emailError, loading } = this.state

    return (
      <Styles>
        <h2>Dapatkan Tips-tips Hidup Sehat dari Kami</h2>
        <p>Kesehatan, Makanan, Diet, dan banyak lainnya</p>
        <form noValidate autoComplete="off" onSubmit={this.submitSubscribe}>
          <div className="form-subscribe">
            <TextField error={emailError} id="outlined-basic" label="Email"
              variant="outlined" type="email" onChange={this.setEmail} value={email} />
            <Button type="submit" loading={loading}>Sign Up Now</Button>
          </div>
        </form>
      </Styles>
    )
  }
}
