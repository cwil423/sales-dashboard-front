const initialState = {
  theme: true,
  user: null,
};

const reducer = (state = initialState, action) => {
  const { theme } = state;
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: !theme,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
