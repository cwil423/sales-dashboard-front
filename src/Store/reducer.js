const initialState = {
  theme: true,
};

const reducer = (state = initialState, action) => {
  const { theme } = state;
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: !theme,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
