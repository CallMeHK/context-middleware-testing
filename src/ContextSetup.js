// unused example of context with thunks for prototyping

import React, { useReducer } from "react";

const Context = React.createContext({});

const Provider = Context.Provider;
const Consumer = Context.Consumer;

let reducer = (state, action) => {
  switch (action.type) {
    case "set-count":
      return { ...state, count: action.payload };
    case "set-word":
      return { ...state, word: action.payload };
    default:
      return state;
  }
};

const store = {
  count: 1,
  word: "reddit"
};

const ProviderComponent = props => {
  let [state, dumbDispatch] = useReducer(reducer, store);
  const dispatch = action => {
    if (typeof action === "function") {
      action({ dispatch: dumbDispatch, state });
    } else {
      dumbDispatch(action);
    }
  };
  let value = { state, dispatch, dumbDispatch };

  return <Provider value={value}>{props.children}</Provider>;
};

export { Context, Provider, Consumer, ProviderComponent };
