import React, { Component } from 'react';
import {connect} from 'react-redux';
class JoinWaitlist extends Component {
    render() {
      return (
        <div>
          <h1>Join Waitlist Page</h1>
           we are switching this page from a modal to a route...
        </div>
      );
    }
  }
  const mapStateToProps = reduxState => ({
      reduxState
  });
  export default connect(mapStateToProps)(JoinWaitlist);