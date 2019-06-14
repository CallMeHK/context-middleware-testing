import cxCreator from "./cxCreator";

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
  word: "reddit!"
};

const sampleMiddleware = ({ action }, next) => {
  console.log("action.type:", action.type);
  next();
};

const setUpExMiddleware = () => {
  let app = 0;
  return ({ action }, next) => {
    app++;
    console.log("count of dispatches:", app);
    next();
  };
};

const thunk = ({ state, dispatch, action }, next) => {
  if (typeof action === "function") {
    console.log("thunking!");
    action({ dispatch, state });
  } else {
    console.log("no thunk needed");
    next();
  }
};

let { Context, Provider, Consumer, ProviderComponent } = cxCreator(
  store,
  reducer,
  sampleMiddleware,
  setUpExMiddleware(),
  thunk
);

export { Context, Provider, Consumer, ProviderComponent };
