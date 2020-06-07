import React from 'react'
import { Avatar, Tooltip, Typography } from '@material-ui/core'
import air from '../static/air.png'
import water from '../static/water.png'
import earth from '../static/earth.png'
import fire from '../static/fire.png'

const avatarSelector = element => {
  switch(element){
    case "air":
      return <Avatar src={air} />
      break
    case "water":
      return <Avatar src={water} />
      break
    case "earth":
      return <Avatar src={earth} />
      break
    case "fire":
      return <Avatar src={fire} />
      break
    default:
      return <Avatar />
      break
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
  console.log(result.element)
  if (typeof result.id === "undefined") { return null }
  return (
    <React.Fragment>
      <Tooltip interactive placement="right" title={renderMessage(result.id, result.name, result.element)}>
        {avatarSelector(result.element)}
      </Tooltip>
    </React.Fragment>
  )
}

export default GraphItem
