import React, { Component } from 'react'
import SearchResult from './SearchResult'
import { TextField } from '@material-ui/core'
import { debounce } from 'lodash'

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      buffer: '',
      keywords: ''
    }
    this.onUserTyping = this.onUserTyping.bind(this)
  }
  
  onSubmitHandler = debounce(() => {
    this.setState({ keywords: this.state.buffer})
  }, 300)

  onUserTyping = e => {
    e.preventDefault()
    this.setState({buffer: e.target.value}, () => {this.onSubmitHandler()})
  }
  
  render() {
    const { buffer, keywords } = this.state
    return (
      <div>
        <form autoComplete="off" onSubmit={e => {e.preventDefault()}}>
          <TextField
            id="keywords"
            label="Search me!"
            helperText="Names, IDs, elements, you name it!"
            type="search"
            value={buffer}
            fullWidth
            autoFocus
            onChange={this.onUserTyping}
          />
        </form>
        <SearchResult searchid={keywords}/>
      </div>
    )
  }
}

export default Form
