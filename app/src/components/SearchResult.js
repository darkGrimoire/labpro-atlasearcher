import React, { Component } from 'react'
import axios from 'axios'
import "./App.css"

class SearchResult extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      error: true,
      result: {}
    }
  }
  
  componentDidMount() {
    console.log(`didMount ${this.props.searchid}`)
    this.getSearchResult(this.props.searchid)
  }

  componentDidUpdate(prevProps) {
    console.log(`didUpdate ${this.props.searchid}`)
    if (this.props.searchid !== prevProps.searchid) {
      this.getSearchResult(this.props.searchid)
    }
  }

  getSearchResult = searchid => {
    axios.get(`https://avatar.labpro.dev/friends/${searchid}`)
      .then(response =>{
        console.log(response.data.payload)
        this.setState({error: false, result: response.data.payload})
      })
      .catch(error => {
        console.log(error)
        this.setState({error: true, result: {}})
      })
  }

  render() {
    const { error, result } = this.state
    console.log(`search rendered! ${result.id}`)
    if (!error){
      return <div>{result.id}. {result.name} with element {result.element}.</div>
    }else{
      return <span className="error">No matching data found...</span>
    }
  }
}

export default SearchResult
