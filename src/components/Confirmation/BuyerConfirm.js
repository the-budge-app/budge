import React, { Component } from 'react'
import { connect } from 'react-redux'

class BuyerConfirm extends Component {
    render() {
        return (
            <>
            <h1>Buyer Confirm Page</h1>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(BuyerConfirm);