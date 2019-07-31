import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// import Semantic UI Component 
import { Grid, Segment, Button } from 'semantic-ui-react'


class UserSpot extends Component {
    render() {
        return (
            <>
                <h1 onClick={this.props.toggleModal}>Current User Owns this spot</h1>
                <Button attached="bottom" fluid onClick={()=>this.props.history.push(`/venue/${this.props.selectedVenue.id}`)}>Back to Wait List</Button>
            </>
        )
    }
}

const MapStateToProps = reduxState => ({
    user: reduxState.user,
    selectedVenue: reduxState.selectedVenue,
})

export default connect(MapStateToProps)(UserSpot);