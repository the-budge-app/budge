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
        marginTop: '5px',
        marginBottom: '5px',
    },
    headingFour: {
        color: 'black',
    }
}


class UserSpot extends Component {

    state = {
        buyerName: 'Michael',
        buyerSpot: '7',
        buyerWaitTime: '90',
        sellerName: 'Kaeti',
        sellerSpot: '2',
        sellerWaitTime: '20',
        offerMade: '45',
        offerReceived: '20',
        sentOfferId: 1,
        receivedOfferId: 2,
    }

    componentDidMount() {
        this.getOffers();
    }

    // function to get the id of any offer made
    // and any offer received
    getOffers = () => {
        axios.get(`/api/offers/user/${this.props.user.id}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log('Error in getting offers for user', error);
            })
    }

    retractOffer = () => {
        axios.put(`/api/offers/reject/${this.state.sentOfferId}`)
            .then(response => {
                this.getOffers();
            })
            .catch(error => {
                console.log('Error retracting offer', error);
            })
    }

    viewOffer = () => {
        this.props.history.push(`/seller-offer/${this.state.receivedOfferId}`)
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
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <h3 style={styles.headingThree}>To: {this.state.sellerName}</h3>
                            <h3 style={styles.headingThree}>Spot: {this.state.sellerSpot}</h3>
                            <h3 style={styles.headingThree}>Est. Wait Time: {this.state.sellerWaitTime}</h3>
                            <h3 style={styles.headingThree}>Amount: ${this.state.offerMade}</h3>
                        </Grid.Column>
                        <Grid.Column width={16} textAlign="center">
                            <Button color="red" onClick={this.retractOffer}>Retract Offer</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                            <h3>Offer Received:</h3>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <h3 style={styles.headingThree}>From: {this.state.buyerName}</h3>
                            <h3 style={styles.headingThree}>Spot: {this.state.buyerSpot}</h3>
                            <h3 style={styles.headingThree}>Est. Wait Time: {this.state.buyerWaitTime}</h3>
                            <h3 style={styles.headingThree}>Amount: ${this.state.offerReceived}</h3>
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

