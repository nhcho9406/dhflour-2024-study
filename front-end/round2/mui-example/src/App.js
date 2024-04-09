import React from 'react';

import { Button, Typography, AppBar, Grid, Paper, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Typography variant="h6">Material-UI Examples</Typography>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '10px' }}>
              <Button variant="contained" color="primary">Primary Button</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '10px' }}>
              <Button variant="contained" color="secondary">Secondary Button</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
