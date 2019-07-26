import React, { Component } from 'react';
import {connect} from 'react-redux';










class RateUser extends Component {
    
  
        
    render() {
      return (
       
        <div>
          <h1>Rate User Page</h1>
           
        
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
      reduxState
  });
  export default connect(mapStateToProps)(RateUser);