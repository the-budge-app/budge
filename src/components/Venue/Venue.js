import React, { Component } from 'react'
import { connect } from 'react-redux'

class Venue extends Component {
    render() {
        return (
            <>
            <h1>Venue Page</h1>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Venue);