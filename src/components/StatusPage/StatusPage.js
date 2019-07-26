import React, { Component } from 'react';
import {connect} from 'react-redux';










class StatusPage extends Component {
    
  
        
    render() {
      return (
       
        <div>
          <h1>Status Page</h1>
           
        
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
      reduxState
  });
  export default connect(mapStateToProps)(StatusPage);