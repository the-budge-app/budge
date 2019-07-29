const venueReducer = (state = [], action) => {
    switch (action.type) {
        // payload for SET_VENUE_LIST should be array of objects
      case 'SET_VENUE_LIST':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default venueReducer;