import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import "./App.scss";

const updateSpeed = 1000;
const url = "https://api.jsonbin.io/b/5f03bbd4343d624b0780f9ff";


//In order to trigger an error message, just edit the URL
const errorMessage = "No data retrieved!";
const modalInstructions = "(Click anywhere to remove this modal)";

const App = () => {
  const [state, setState] = useState({ m: 0, n: 0, state: [[]] });
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(url);
      let { data } = await response.json();
      //TO-DO: Have modal slide out on close!
      data === undefined ? setError(true) : setState(data);
    };

    //******************************/
    //Simply for decoration...
    //This code can be removed!
    setTimeout(() => {
      fetchData();
    }, 1500);
    //******************************/
  }, []);

  const handleModalClose = () => {
    setError(false);
  };
  return (
    <div className="App" onClick={handleModalClose}>
      {error && (
        <div className="modal">
          {errorMessage}
          <div className="modal__instructions">{modalInstructions}</div>
        </div>
      )}
      <Grid data={state} updateSpeed={updateSpeed} />
    </div>
  );
};

export default App;
