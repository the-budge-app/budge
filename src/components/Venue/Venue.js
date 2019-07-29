import React, { Component } from 'react'
import { connect } from 'react-redux'
import Logout from '../LogOutButton/LogOutButton';

class Venue extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_VENUE_INFO',
            payload: { restaurant_id: 1}
        })
    }
    render() {
        return (
            <>
            <h1>Venue Page</h1>
            <Logout />
            <pre>
                {JSON.stringify(this.props.reduxState.venueInfo, null, 2)}
            </pre>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Venue);