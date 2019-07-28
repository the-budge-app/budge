import React, { Component } from 'react'
import { connect } from 'react-redux'

class Contact extends Component {
    render() {
        return (
            <>
            <h2>Contact Us Page</h2>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Contact);