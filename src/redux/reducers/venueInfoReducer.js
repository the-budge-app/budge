const venueInfoReducer = (state = [], action) => {
  //reducer to store the venue + waitlist information regarding one specific restaurant that user selected
    switch (action.type) {
      case 'SET_VENUE_INFO':
        return action.payload;
      default:
        return state;
    }
  };
  export default venueInfoReducer;