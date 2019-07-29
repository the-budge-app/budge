// holds the single selectedVenue object once user clicks to view the venue

const selectedVenue = (state = {}, action) => {
    switch (action.type) {
        // payload for SET_VENUE_LIST should be array of objects
      case 'SET_SELECTED_VENUE':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default selectedVenue;