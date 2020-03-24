import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%',
      paddingLeft: 350,
      paddingRight: 350,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  })
)

const Exercises = ({ exercises }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList cellHeight={280} className={classes.gridList}>
        {exercises.map(tile => (
          <GridListTile key={tile.media}>
            <GridListTileBar
              title={tile.name}
              subtitle={<span>{tile.target.join(', ')}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.name}`}
                  className={classes.icon}
                >
                  {tile.difficulty}
                </IconButton>
              }
            />
            <CardMedia
              component="video"
              image={`/images/${tile.media}.mp4`}
              title={tile.name}
              autoPlay={true}
              loop={true}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

Exercises.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe = await require('../public/exercises.json')

  return {
    exercises: exe.map(entry => entry),
  }
}

export default Exercises
