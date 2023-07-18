import {forwardRef} from 'react'
import { Link } from 'react-router-dom'
import { Link as MLink } from '@mui/material'

const GLink = forwardRef((props, ref) => {
  return (
    <MLink component={Link} ref={ref} to={props.to}>
      {props.children}
    </MLink>
  )
}) 


const theme = {
  colors: {
    primary: 'hsl(181, 48%, 51%)',
    background: '#E1E0E0',

    white: 'hsl(0, 0%, 100%)',


    gray: '#8f8f8f',
    divisor: 'hsl(0, 0%, 82%)'
  },

  type: 'light',
  palette: {
    primary: {
      main: '#45BD93',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F96153',
    },
    white: {
      main: '#ffffff'
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: GLink,
      },
      MuiButtonBase: {
        defualtProps: {
          LinkComponent: GLink
        }
      }
    }
  }
}

export default theme

/*
  primary: '#45BD93',
        secondary: '#F96153',
*/