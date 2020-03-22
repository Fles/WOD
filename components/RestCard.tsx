import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'

export default function RestCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <b>15'</b>
          </Avatar>
        }
        title={'Rest'}
        subheader={props.difficulty}
      />

      <CardMedia
        component="video"
        image={`/images/head-tilt.mp4`}
        title={props.name}
        autoPlay={true}
        loop={true}
      />
    </Card>
  )
}
