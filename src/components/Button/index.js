import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const Styles = styled.div`
  display: inline-block;

  .MuiButton-root {
    border-radius: 0;
  }

  .MuiButton-containedPrimary {
    background-color: ${props => props.theme.color.primary};
  }

  .MuiButton-containedPrimary:hover {
    background-color: ${props => props.theme.color.red};
  }

  .MuiCircularProgress-colorPrimary {
    color: white;
  }
`

export default function MyButton(props) {
  const { loading, children } = props

  return (
    <Styles>
      <Button variant="contained" color="primary" disableElevation disabled={loading} {...props}>
        {loading ? <CircularProgress style={{ width: "24px", height: "24px" }} /> : children}
      </Button>
    </Styles>
  )
}
