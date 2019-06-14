const updateCount = num => ({ state, dispatch }) => {
  dispatch({
    type: "set-count",
    payload: state.count + num
  });
};

const updateWord = (dispatch, word) => {
  dispatch({
    type: "set-word",
    payload: word
  });
};

export { updateCount, updateWord };
