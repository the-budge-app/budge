const adminReducer = (state = [], action) => {
    switch (action.type) {
        // payload should be single object from db
      case 'SET_COMMENTS':
        return action.payload;
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default adminReducer;


  