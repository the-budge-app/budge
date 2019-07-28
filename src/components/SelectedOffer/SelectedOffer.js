import React, { Component } from 'react'
import { connect } from 'react-redux'

class SelectedOffer extends Component {
    render() {
        return (
            <>
            <h1>Selected Offer Page</h1>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(SelectedOffer);