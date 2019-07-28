import React, { Component } from 'react'
import { connect } from 'react-redux'

class SellerConfirm extends Component {
    render() {
        return (
            <>
            <h1>Seller Confirm Page</h1>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(SellerConfirm);