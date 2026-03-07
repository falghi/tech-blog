import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import { toast } from 'react-toastify'

import Button from "../Button"

import { rhythm } from "../../utils/typography"
import { subscribeEmail } from "../../services/auth"

const Styles = styled.div`
  background: ${props => props.theme.color.lightblue};
  padding: 40px 25px;

  & > p {
    margin-bottom : 1.25rem;
  }

  form {
    margin-bottom: 0;
  }

  h2 {
    margin-top: 0;
    color: ${props => props.theme.color.primary};
  }

  .MuiFormLabel-root.Mui-focused {
    color: ${props => props.theme.color.primary};
  }

  .MuiInput-underline:after {
    border-bottom-color: ${props => props.theme.color.primary};
  }

  .MuiFormLabel-root.Mui-focused.Mui-error {
    color: ${props => props.theme.color.red};
  }

  .MuiInput-underline.Mui-error:after {
    border-bottom-color: ${props => props.theme.color.red};
  }

  button {
    width: 125px;
  }
`

class VerticalSignupNews extends Component {
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
        <h2>Ingin Mendapatkan Tips-tips Hidup Sehat dari Kami?</h2>
        <p>
          Masukkan email anda di bawah ini dan kami akan mengirimkan tips-tips
          seputar kesehatan, makanan, dan juga diet.
        </p>
        <form noValidate autoComplete="off" onSubmit={this.submitSubscribe}>
          <div style={{ paddingBottom: rhythm(1 / 2) }}>
            <TextField error={emailError} id="standard-basic" label="Email"
              type="email" onChange={this.setEmail} value={email} />
          </div>
          <Button type="submit" loading={loading}>Sign Up Now</Button>
        </form>
      </Styles>
    )
  }
}

export default VerticalSignupNews
