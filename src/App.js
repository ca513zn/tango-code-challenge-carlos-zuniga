import React, { useState, useEffect } from "react";
import MainView from "./components/Grid";
import { data } from "./data";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, green, grey } from "@material-ui/core/colors";

const updateSpeed = 1000;

const theme = createMuiTheme({
  palette: {
    background: {
      dark: grey[900],
    },
    primary: {
      main: green[500],
      dead: grey[800],
      sad: blue[500],
      happy: green[500],
    },
  },
});

const App = () => {
  const [state, setState] = useState({ m: 0, n: 0, state: [[]] });
  useEffect(() => {
    const fetchData = async () => {
      setState(data);
    };
    setTimeout(() => {
      fetchData();
    }, 1500);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MainView data={state} updateSpeed={updateSpeed} />
    </ThemeProvider>
  );
};

export default App;
