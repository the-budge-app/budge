import React, { Component } from 'react';
import {connect} from 'react-redux';










class SellerOffer extends Component {
    
  
        
    render() {
      return (
       
        <div>
          <h1>Seller Offer Page Page</h1>
           
        
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
      reduxState
  });
  export default connect(mapStateToProps)(SellerOffer);