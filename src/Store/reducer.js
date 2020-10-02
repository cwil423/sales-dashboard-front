const { CallToActionSharp } = require("@material-ui/icons")

const initialState = {
  theme: true
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_THEME':
      const theme = state.theme
      return {
        ...state,
        theme: !theme 
      }

  }
  return state;
}

export default reducer;