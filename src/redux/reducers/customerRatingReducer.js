const ratingReducer = (state = {rating: '1'}, action) => {
    switch (action.type) {
        // payload should be single object from db
      case 'SET_USER_RATING':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default ratingReducer;