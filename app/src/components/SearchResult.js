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
      results: [], // Array of payload (Array of Array of Objects)
      friends: [] // Array of clean friends (Array of Array of Objects)
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
        this.setState({error: '', results: [], friends: []})
      }else{
        this.getSearchResult(this.props.searchid)
      }
    }
  }

  getSearchResult = searchid => {
    if (!this.isNumeric.test(this.props.searchid)){
      this.setState({error: 'Please type only numeric values (name search coming soon!)', results: [], friends: []})
    }else{
      axios.get(`https://avatar.labpro.dev/friends/${searchid}`)
        .then(response =>{
          const newResults = []
          newResults.push(response.data.payload)
          const friends = response.data.payload.friends
          const uniqueFriends = Array.from(new Set(friends.filter(x => x.id !== response.data.payload.id).map(x => x.id))).map(id => {return friends.find(x => x.id === id)})
          const newFriends = []
          newFriends.push(uniqueFriends)
          console.log(newResults)
          console.log(newFriends)
          this.setState({error: '', results: newResults, friends: newFriends})
        })
        .catch(error => {
          console.log(error)
          this.setState({error: 'No matching data found', results: [], friends: []})
        })
    }
  }

  onClickExpand = (level, id) => {
    console.log(`clicked from level ${level} from ${id}!`)
    axios.get(`https://avatar.labpro.dev/friends/${id}`)
      .then(response =>{
        const newResults = this.state.results.slice(0, level)
        newResults.push(response.data.payload)
        const friends = response.data.payload.friends
        const uniqueFriends = Array.from(new Set(friends.filter(x => x.id !== response.data.payload.id).map(x => x.id))).map(id => {return friends.find(x => x.id === id)})
        const newFriends = this.state.friends.slice(0, level)
        newFriends.push(uniqueFriends)
        console.log(newResults)
        console.log(newFriends)
        this.setState({error: '', results: newResults, friends: newFriends})
      })
      .catch(error => {
        console.log('Something went wrong while fetching onClickExpand SearchAPI')
        console.log(error)
      })
  }

  render() {
    const { error, results, friends } = this.state
    const highlighted = results.map(x => x.id)
    console.log(`search rendered!`)
    console.log(this.state)
    if (!results.length) {return <div style={{marginBottom: '300px'}}><span className="error">{error}</span></div>}
    return (
      <Container>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          marginBottom="50px"
        >
          <div className={`lv0-${results[0].id} highlight`}>
            <GraphItem onClickExpand={this.onClickExpand} level={0} result={results[0]} />
          </div>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          marginBottom="50px"
          >
        {
          friends[0].map(friend => <div key={`lv1-${friend.id}`} className={`lv1-${friend.id} ${highlighted.includes(friend.id) ? 'highlight':''}`}><GraphItem onClickExpand={this.onClickExpand} level={1} result={friend} /></div>)
        } 
        </Box>
        {
          friends[0].map(friend => <LineTo from={`lv0-${results[0].id}`} to={`lv1-${friend.id}`} fromAnchor="bottom" toAnchor="top" {...this.lineStyle}/>)
        }
        {
          results.map((result, level) => {
            if (results.length == 1) {return null}
            if (level == 0) {return null}
            return (
              <React.Fragment>
                <Box
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                marginBottom="50px"
                >
                {
                  friends[level].map(friend => <div key={`lv${level+1}-${friend.id}`} className={`lv${level+1}-${friend.id} ${highlighted.includes(friend.id) ? 'highlight':''}`}><GraphItem onClickExpand={this.onClickExpand} level={level+1} result={friend} /></div>)
                }
                </Box>
                {
                  friends[level].map(friend => <LineTo from={`lv${level}-${result.id}`} to={`lv${level+1}-${friend.id}`} fromAnchor="bottom" toAnchor="top" {...this.lineStyle}/>)
                }
              </React.Fragment>
            )
          })
        }
      </Container>
    )
  }
}

export default SearchResult
