import React from 'react';
import './App.css';
import Form from './Form'
import { Typography, Paper, Grow } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Paper className="main-container" elevation={10}>
        <Grow in={true} {...({timeout: 1000}) }>
          <Typography variant="h3" gutterBottom style={{color: '#4d4d4d'}}>ATLA Searcher</Typography>
        </Grow>
        <Form />
      </Paper>
    </div>
  );
}

export default App;
