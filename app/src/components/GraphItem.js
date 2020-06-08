import React, { Component } from 'react'
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

class GraphItem extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      level: this.props.level,
      id: this.props.result.id
    }
  }
  
  avatarSelector = (element, onClickExpand) => {
    switch(element){
      case "air":
        return <IconButton onClick={() => onClickExpand(this.state.level, this.state.id)} size="small" style={style.avatarAirRipple}><Avatar src={air} style={style.avatarSize}/></IconButton>
      case "water":
        return <IconButton onClick={() => onClickExpand(this.state.level, this.state.id)} size="small" style={style.avatarWaterRipple}><Avatar src={water} style={style.avatarSize}/></IconButton>
      case "earth":
        return <IconButton onClick={() => onClickExpand(this.state.level, this.state.id)} size="small" style={style.avatarEarthRipple}><Avatar src={earth} style={style.avatarSize}/></IconButton>
      case "fire":
        return <IconButton onClick={() => onClickExpand(this.state.level, this.state.id)} size="small" style={style.avatarFireRipple}><Avatar src={fire} style={style.avatarSize}/></IconButton>
      default:
        return <Avatar />
    }
  }
  
  renderMessage = (id, name, element) => {
    return (
      <React.Fragment>
        <Typography color="inherit">{name}</Typography>
        <span>id: {id}</span><br/>
        <span>element: {element}</span>
      </React.Fragment>
    )
  }

  render() {
  const { onClickExpand, result } = this.props
    return (
      <React.Fragment>
        <Box display="block" textAlign="center" marginX="5px">
          <Tooltip placement="right" title={this.renderMessage(result.id, result.name, result.element)}>
            {this.avatarSelector(result.element, onClickExpand)}
          </Tooltip>
          <p style={style.caption}>
            {result.name.indexOf(' ') === -1 ? result.name : result.name.substr(0,result.name.indexOf(' '))}
          </p>
        </Box>
      </React.Fragment>
    )
  }
}

export default GraphItem
