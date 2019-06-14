import React, { useCallback, useReducer } from "react";

function applyMiddleware(...warez) {
  const dispatcher = ({ state, dispatch, action }) => {
    dispatch(action);
  };

  const middleWares = [...warez, dispatcher];

  return (state, dispatch) => action => {
    let i = 0;

    const next = () => {
      i++;
      middleWares[i]({ state, dispatch, action }, next);
    };
    middleWares[0]({ state, dispatch, action }, next);
  };
}

function cxCreator(store, reducer, ...middleWare) {
  console.log(middleWare);
  const runMiddleware = applyMiddleware(...middleWare);

  const Context = React.createContext({});

  const Provider = Context.Provider;
  const Consumer = Context.Consumer;

  const ProviderComponent = props => {
    let [state, dumbDispatch] = useReducer(reducer, store);
    let dispatch = useCallback(runMiddleware(state, dumbDispatch), [
      state,
      dumbDispatch
    ]);

    return <Provider value={{ state, dispatch }}>{props.children}</Provider>;
  };

  return { Context, Provider, Consumer, ProviderComponent };
}

export default cxCreator;
export { applyMiddleware };
