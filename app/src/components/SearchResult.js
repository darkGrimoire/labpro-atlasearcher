import React, { Component } from 'react'
import axios from 'axios'
import { Box, Container } from '@material-ui/core'
import "./App.css"
import GraphItem from './GraphItem'
import LineTo from 'react-lineto'

class SearchResult extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      error: '',
      result: {},
      friends: []
    }
  }
  isNumeric = /^(0|-?[1-9][0-9]*)$/
  lineStyle = {
    delay: true,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1
  }
  
  componentDidMount() {
    console.log(`didMount ${this.props.searchid}`)
    if (this.props.searchid.length){
      this.getSearchResult(this.props.searchid)
    }
  }

  componentDidUpdate(prevProps) {
    console.log(`didUpdate ${this.props.searchid}`)
    if (this.props.searchid !== prevProps.searchid) {
      if (!this.props.searchid.length){
        this.setState({error: '', result: {}, friends: []})
      }else if (!this.isNumeric.test(this.props.searchid)){
        this.setState({error: 'Please type only numeric values', result: {}, friends: []})
      }else{
        this.getSearchResult(this.props.searchid)
      }
    }
  }

  getSearchResult = searchid => {
    axios.get(`https://avatar.labpro.dev/friends/${searchid}`)
      .then(response =>{
        console.log(response.data.payload)
        const friends = response.data.payload.friends
        const uniqueFriends = Array.from(new Set(friends.filter(x => x.id !== response.data.payload.id).map(x => x.id))).map(id => {return friends.find(x => x.id === id)})
        console.log(uniqueFriends)
        this.setState({error: '', result: response.data.payload, friends: uniqueFriends})
      })
      .catch(error => {
        console.log(error)
        this.setState({error: 'No matching data found', result: {}})
      })
  }

  render() {
    const { error, result, friends } = this.state
    console.log(`search rendered!`)
    console.log(this.state)
    if (typeof result.id === "undefined") {return <span className="error">{error}</span>}
    return (
      <div>
        <Container>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            marginBottom="50px"
          >
            <div className={result.id}>
              <GraphItem name={result.id} result={result} />
            </div>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            >
          {
            friends.map(friend => <div key={friend.id} className={friend.id}><GraphItem name={friend.id} result={friend} /></div>)
          } 
          </Box>
        </Container>
          {
            friends.map(friend => <LineTo from={result.id} to={friend.id} fromAnchor="bottom" toAnchor="top" {...this.lineStyle}/>)
          }
      </div>
    )
  }
}

export default SearchResult
