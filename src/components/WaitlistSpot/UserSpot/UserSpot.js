import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

// import Semantic UI Component 
import { Grid, Button, Divider } from 'semantic-ui-react'


const styles = {
    headingOne: {

    },
    headingTwo: {

    },
    headingThree: {

    },
    headingFour: {
        color: 'black',
    }
}


class UserSpot extends Component {

    state = {
        buyerName: 'Michael',
        sellerName: 'Kaeti',
        offerMade: '45',
        offerReceived: '20',
    }

    render() {
        return (
            <>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h2 onClick={this.props.toggleModal}>Status at</h2>
                        </Grid.Column>
                        <Grid.Column width={16} textAlign="center">
                            <h1>{this.props.selectedVenue.restaurant_name}</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h3>Offer Made:</h3>
                            <h4 style={styles.headingFour}>{this.state.sellerName} ${this.state.offerMade}</h4>
                        </Grid.Column>
                        <Grid.Column width={16} textAlign="center">
                            <Button color="red" onClick={this.retractOffer}>Retract Offer</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h3>Offer Received:</h3>
                            <h4 style={styles.headingFour}>{this.state.buyerName} ${this.state.offerReceived}</h4>
                        </Grid.Column>
                        <Grid.Column width={16} textAlign="center">
                            <Button color="green" onClick={this.viewOffer}>View Offer</Button>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                <Button attached="bottom" fluid onClick={() => this.props.history.push(`/venue/${this.props.selectedVenue.id}`)}>Back to Wait List</Button>
                <pre>
                    {JSON.stringify(this.props.reduxState, null, 2)}
                </pre>
            </>
        )
    }
}

const MapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user,
    selectedVenue: reduxState.selectedVenue,
})

export default connect(MapStateToProps)(UserSpot);