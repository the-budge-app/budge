import React, { Component } from 'react'
import { connect } from 'react-redux'
import Logout from '../LogOutButton/LogOutButton';

class Venue extends Component {
    render() {
        return (
            <>
            <h1>Venue Page</h1>
            <Logout />
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Venue);