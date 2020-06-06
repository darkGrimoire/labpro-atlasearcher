import React, { Component } from 'react'
import axios from 'axios'

class SearchResult extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      result: {}
    }
  }
  
  componentDidMount() {
    axios.get(`https://avatar.labpro.dev/friends/{this.props.id}`)
      .then(response =>{
        console.log(response.data.payload)
        this.setState({result: response.data.payload})
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { result } = this.state
    if (result == {}){
      return <div>{result.id}. {result.name} with element {result.element}.</div>
    }else{
      return null
    }
  }
}

export default SearchResult
