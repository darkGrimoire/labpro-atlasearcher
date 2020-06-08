import React from 'react';
import './App.css';
import Form from './Form'
import { Typography, Paper, Grow, Grid } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item sm={12}>
          <Paper className="main-container" elevation={10}>
            <Grow in={true} timeout={1000}>
              <Typography
                variant="h3"
                gutterBottom
                style={{color: '#4d4d4d'}}
                >
                ATLA Searcher
              </Typography>
            </Grow>
            <Form />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
