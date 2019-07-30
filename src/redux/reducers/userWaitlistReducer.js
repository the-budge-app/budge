const userWaitlistReducer = (state = {}, action) => {
    //reducer to store the venue + waitlist information regarding one specific restaurant that user selected
      switch (action.type) {
        case 'SET_USER_WAITLIST':
          return action.payload;
        default:
          return state;
      }
    };
  
    
    export default userWaitlistReducer;