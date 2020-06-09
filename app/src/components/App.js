import React from 'react';
import './App.css';
import Form from './Form'
import { Typography, Paper, Grow, Grid, Tooltip } from '@material-ui/core'

const aboutAuthor = () => {
  return (
    <React.Fragment>
      <Typography variant="button">Author: Faris Rizki Ekananda</Typography><br />
      <Typography variant="caption">version: 1.0</Typography>
    </React.Fragment>
  )
}

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item sm={12}>
          <Paper className="main-container" elevation={10}>
            <Tooltip placement="top" title={aboutAuthor()}>
              <Grow in={true} timeout={1000}>
              <Typography
                variant="h3"
                gutterBottom
                style={{color: '#4d4d4d'}}
                onContextMenu={e => e.preventDefault()}
                >
                Suspect Expander-kun
              </Typography>
              </Grow>
            </Tooltip>
            <Form />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
