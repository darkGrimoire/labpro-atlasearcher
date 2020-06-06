import React, { Component } from 'react'
import axios from 'axios'
import SearchResult from './SearchResult'
import { makeStyles, TextField } from '@material-ui/core'

class Form extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       keywords: ''
    }
  }

  onChangeHandler = (e) => {
    this.setState({[e.target.name]: [e.target.value]})
  }

  onSubmitHandler = e => {
    e.preventDefault()
    console.log(e)
    
  }

  render() {
    const { keywords } = this.state
    return (
      <div>
        <form autoComplete="off" onSubmit={this.onSubmitHandler}>
          {/* <input 
            type="text" 
            name="keywords" 
            value={keywords} 
            onChange={this.onChangeHandler}
          /> */}
          <TextField
            id="keywords"
            label="Search me!"
            type="search"
            fullWidth
            autoFocus
          />
        </form>
        <SearchResult />
      </div>
    )
  }
}

export default Form
