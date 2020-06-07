import React, { Component } from 'react'
import SearchResult from './SearchResult'
import { TextField } from '@material-ui/core'

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       keywords: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }
  
  onSubmitHandler = e => {
    e.preventDefault()
    this.setState({ keywords: e.target.value})
    console.log(e.target.value)
  }
  
  render() {
    const { keywords } = this.state
    return (
      <div>
        <form autoComplete="off" onSubmit={e => {e.preventDefault()}}>
          <TextField
            id="keywords"
            label="Search me!"
            type="search"
            value={keywords}
            fullWidth
            autoFocus
            onChange={this.onSubmitHandler}
          />
        </form>
        <SearchResult searchid={keywords}/>
      </div>
    )
  }
}

export default Form
