const selectedSpotReducer = (state = {}, action) => {
    switch (action.type) {
        // payload should be single object from db
      case 'SET_SELECTED_SPOT':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default selectedSpotReducer;