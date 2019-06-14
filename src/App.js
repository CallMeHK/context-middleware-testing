import React, { useEffect, useContext, useCallback } from "react";
import logo from "./logo.svg";
import { Context } from "./cxCreator/SetUpCxCreator";
import { updateCount, updateWord } from "./ContextActions";

import "./App.css";

const App = () => {
  const { state, dispatch } = useContext(Context);
  const setCount = () => dispatch(updateCount(1));
  const setWord = word => dispatch({ type: "set-word", payload: word });
  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>The count is {state.count}</code>
        </p>
        <p>
          <code>The word is {state.word}</code>
        </p>
        <div>
          <button onClick={() => setCount()}>Increase count</button>
        </div>
        <div>
          <input value={state.word} onChange={e => setWord(e.target.value)} />
        </div>
      </header>
    </div>
  );
};

export default App;
