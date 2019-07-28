import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
    render() {
        return (
            <>
            <h2>Profile Page</h2>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Profile);