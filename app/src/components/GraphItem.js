import React from 'react'
import { Avatar, Tooltip, Typography, IconButton, Box } from '@material-ui/core'
import air from '../static/air.png'
import water from '../static/water.png'
import earth from '../static/earth.png'
import fire from '../static/fire.png'

const style = {
  avatarSize: {
    width: '2rem',
    height: '2rem'
  },
  avatarAirRipple: {
    color: 'yellow'
  },
  avatarWaterRipple: {
    color: 'blue'
  },
  avatarEarthRipple: {
    color: 'green'
  },
  avatarFireRipple: {
    color: 'red'
  },
  caption: {
    fontSize: '10px',
    color: '#282c34'
  },
}

const avatarSelector = element => {
  switch(element){
    case "air":
      return <IconButton size="small" style={style.avatarAirRipple}><Avatar src={air} style={style.avatarSize}/></IconButton>
    case "water":
      return <IconButton size="small" style={style.avatarWaterRipple}><Avatar src={water} style={style.avatarSize}/></IconButton>
    case "earth":
      return <IconButton size="small" style={style.avatarEarthRipple}><Avatar src={earth} style={style.avatarSize}/></IconButton>
    case "fire":
      return <IconButton size="small" style={style.avatarFireRipple}><Avatar src={fire} style={style.avatarSize}/></IconButton>
    default:
      return <Avatar />
  }
}

const renderMessage = (id, name, element) => {
  return (
    <React.Fragment>
      <Typography color="inherit">{name}</Typography>
      <span>id: {id}</span><br/>
      <span>element: {element}</span>
    </React.Fragment>
  )
}

function GraphItem(props) {
  const { result } = props
  if (typeof result.id === "undefined") { return null }
  return (
    <React.Fragment>
      <Box display="block" textAlign="center" marginX="5px">
        <Tooltip placement="right" title={renderMessage(result.id, result.name, result.element)}>
          {avatarSelector(result.element)}
        </Tooltip>
        <p style={style.caption}>
          {result.name.indexOf(' ') === -1 ? result.name : result.name.substr(0,result.name.indexOf(' '))}
        </p>
      </Box>
    </React.Fragment>
  )
}

export default GraphItem
