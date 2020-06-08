import React, { Component } from 'react'
import axios from 'axios'
import { Box, Container, Typography } from '@material-ui/core'
import "./App.css"
import GraphItem from './GraphItem'
import LineTo from 'react-lineto'

const MIN_ID = 1
const MAX_ID = 186
const ELEMENT_TYPE = ['air', 'water', 'earth', 'fire']
class SearchResult extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      error: '',
      searchList: [], // Array of all payloads
      rootNode: [], // Array of searchedByInput payload(s)
      results: [], // Array of selected payload (Array of Array of Objects)
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
    this.generateSearchList()
  }

  componentDidUpdate(prevProps) {
    console.log(`didUpdate ${this.props.searchid} ${prevProps.searchid}`)
    console.log(this.props)
    console.log(prevProps)
    if (this.props.searchid !== prevProps.searchid) {
      if (!this.props.searchid.length){
        this.setState({error: '', rootNode: [], results: [], friends: []})
      }else{
        this.getSearchResult(this.props.searchid)
      }
    }
  }

  generateSearchList = () => {
    let newSearchList = []
    let id
    for (id=MIN_ID; id<=MAX_ID; id++){
      axios.get(`https://avatar.labpro.dev/friends/${id}`)
      .then(response =>{
        newSearchList.push(response.data.payload)
        if (newSearchList.length === MAX_ID){
          this.setState({searchList: newSearchList})
          console.log('Generate searchList done!')
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({error: 'Error fetching search list', rootNode: [], results: [], friends: []})
      })
    }
  }

  searchByElement = search_element => {
    const newRootNode = this.state.searchList.filter(x => x.element === search_element)
    const newResults = [newRootNode[0]]
    const friends = newResults[0].friends
    const uniqueFriends = Array.from(new Set(friends.filter(x => x.id !== newResults[0].id).map(x => x.id))).map(id => {return friends.find(x => x.id === id)})
    const newFriends = [uniqueFriends]
    console.log('searchByElement log res:')
    console.log(newRootNode)
    console.log(newResults)
    console.log(newFriends)
    this.setState({error: '', rootNode: newRootNode, results: newResults, friends: newFriends})
  }

  searchByName = search_name => {
    const newRootNode = this.state.searchList.filter(x => x.name.toLowerCase().includes(search_name))
    if (newRootNode.length === 0){
      this.setState({error: 'No matching data found', rootNode: [], results: [], friends: []})
    }else{
      const newResults = [newRootNode[0]]
      const friends = newResults[0].friends
      const uniqueFriends = Array.from(new Set(friends.filter(x => x.id !== newResults[0].id).map(x => x.id))).map(id => {return friends.find(x => x.id === id)})
      const newFriends = [uniqueFriends]
      console.log('searchByName log res:')
      console.log(newRootNode)
      console.log(newResults)
      console.log(newFriends)
      this.setState({error: '', rootNode: newRootNode, results: newResults, friends: newFriends})
    }
  }

  getSearchResult = searchid => {
    if (!this.isNumeric.test(searchid)){
      searchid = searchid.toLowerCase()
      if (this.state.searchList.length !== MAX_ID){
        this.setState({error: 'SearchList has not been built. Please try typing it again', rootNode: [], results: [], friends: []})
      }else if (ELEMENT_TYPE.indexOf(searchid) > -1){
        this.searchByElement(searchid)
      }else{
        this.searchByName(searchid)
      }
    }else{
      axios.get(`https://avatar.labpro.dev/friends/${searchid}`)
        .then(response =>{
          const newResults = [response.data.payload]
          const newRootNode = [response.data.payload]
          const friends = response.data.payload.friends
          const uniqueFriends = Array.from(new Set(friends.filter(x => x.id !== response.data.payload.id).map(x => x.id))).map(id => {return friends.find(x => x.id === id)})
          const newFriends = [uniqueFriends]
          console.log(newRootNode)
          console.log(newResults)
          console.log(newFriends)
          this.setState({error: '', rootNode: newRootNode, results: newResults, friends: newFriends})
        })
        .catch(error => {
          console.log(error)
          this.setState({error: 'No matching data found', rootNode: [], results: [], friends: []})
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
        console.log(this.state.rootNode)
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
    const { error, rootNode, results, friends } = this.state
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
        {
          rootNode.map(node => <div className={`lv0-${node.id} ${highlighted.includes(node.id) ? 'highlight':''}`}><GraphItem onClickExpand={this.onClickExpand} level={0} result={node} /></div>)
        }
        </Box>
        <Typography variant='overline' className='level-info'>Level 1</Typography>
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
            if (results.length === 1) {return null}
            if (level === 0) {return null}
            return (
              <React.Fragment>
                <Typography variant='overline' className='level-info'>Level {level+1}</Typography>
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
