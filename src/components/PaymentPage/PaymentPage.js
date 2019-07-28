import React, { Component } from 'react'
import { connect } from 'react-redux'

class PaymentPage extends Component {
    render() {
        return (
            <>
            <h1>Payment Page</h1>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(PaymentPage);