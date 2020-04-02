import React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import {
  Stepper,
  Step,
  StepContent,
  StepLabel,
  IconButton,
} from '@material-ui/core'
import Router from 'next/router'
import MenuIcon from '@material-ui/icons/Menu'

export default function WodToolbar(props) {
  const router = useRouter()
  const path = router.pathname

  const options = [
    { name: 'home', path: '/' },
    { name: 'start', path: '/start' },
    { name: 'exercises', path: '/exercises' },
  ]

  return (
    <Toolbar>
      <Grid container spacing={2}>
        {options.map(o => {
          return (
            <Grid item>
              <Button
                variant="text"
                color={path === o.path ? 'primary' : 'secondary'}
                onClick={() => Router.push(o.path)}
              >
                {o.name}
              </Button>
            </Grid>
          )
        })}
      </Grid>
    </Toolbar>
  )
}
