import React, { Component } from 'react'
import axios from 'axios'
import { Box, Container, Divider } from '@material-ui/core'
import "./App.css"
import GraphItem from './GraphItem'
import { LineTo, SteppedLineTo } from 'react-lineto'

class SearchResult extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      error: '',
      result: {}
    }
  }
  isNumeric = /^(0|-?[1-9][0-9]*)$/
  lineStyle = {
    delay: true,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 2
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
        this.setState({error: '', result: {}})
      }else if (!this.isNumeric.test(this.props.searchid)){
        this.setState({error: 'Please type only numeric values', result: {}})
      }else{
        this.getSearchResult(this.props.searchid)
      }
    }
  }

  getSearchResult = searchid => {
    axios.get(`https://avatar.labpro.dev/friends/${searchid}`)
      .then(response =>{
        console.log(response.data.payload)
        this.setState({error: '', result: response.data.payload})
      })
      .catch(error => {
        console.log(error)
        this.setState({error: 'No matching data found', result: {}})
      })
  }

  render() {
    const { error, result } = this.state
    console.log(`search rendered! ${result.id}`)
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
            result.friends.map(friend => <div key={friend.id} className={friend.id}><GraphItem name={friend.id} result={friend} /></div>)
          } 
          </Box>
          {
            // result.friends.map(friend => <LineTo from={result.id} to={friend.id}/>)
            result.friends.map(friend => <SteppedLineTo from={result.id} to={friend.id} orientation="v" />)
          }
          {/* <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <GraphItem result={result} />
            <GraphItem result={result} />
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
            <GraphItem result={result} />
          </Box> */}
        </Container>
      </div>
    )
  }
}

export default SearchResult
