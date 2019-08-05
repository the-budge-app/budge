import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'


// import Semantic UI Component 
import { Grid, Segment, Button, Icon, Rating, Input, Modal, Header } from 'semantic-ui-react'

const styles = {
    icon: {
        fontSize: '15vw',
        marginBottom: '10px',
        marginTop: '10px',
    },
    gridRow: {
        paddingTop: '0',
        paddingBottom: '0',
    },
    partyData: {
        margin: '0',
    }
}

class NonUserSpot extends Component {

    state = {
        lastRejected: '',
        userRating: 4.5,
        offerPrice: '',
        offerModal: false,
    }

    componentDidMount() {
        axios.get(`/api/offers/last-rejected/${this.props.match.params.id}`)
            .then(response => {
                // console.log('last rejected', response.data)
                this.setState({
                    lastRejected: response.data.offer_price,
                })
            })
        
    }

    handleInput = (event) => {
        this.setState({
            ...this.state,
            offerPrice: event.target.value,
        })
    }

    makeOffer = () => {
        console.log(this.state.offerPrice);
        // check user account balance
        // load modal if user doesn't have enough
        // otherwise, fire off make offer saga probably 

        if (this.props.user.account_balance >= this.state.offerPrice) {
            axios.post('/api/offers/make-new', {
                waitlistId: this.props.selectedSpot.id,
                offerPrice: this.state.offerPrice,
                venueId: this.props.selectedVenue.id,
            })
            // reset state
            this.setState({
                ...this.state,
                offerPrice: '',
                offerModal: true,
            })
        } // open modal to make user add funds
        else {
            this.props.toggleModal();
        }
    }

    closeOfferModal = () => {
        this.setState({
            ...this.state,
            offerModal: false,
        })
        this.props.history.push(`/venue/${this.props.selectedVenue.id}`)
    }

    render() {
        return (
            <>
                {/* <h1 onClick={this.props.toggleModal}>This spot is NOT owned by the user</h1> */}
                
                <Segment attached >
                    <Grid id="spotData">
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={7} textAlign="center">
                                <Icon circular bordered name="user" color="grey" style={styles.icon} />
                                <Rating rating={this.props.customerRating.rating && this.props.customerRating.rating.substring(0,1)} maxRating={5} disabled size='large' />
                                <h5>{this.props.customerRating? this.props.customerRating.rating.substring(0,3) : 111}</h5>
                            </Grid.Column>
                            <Grid.Column width={9} style={{ paddingLeft: '0' }}>
                                <Grid>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={16}>
                                            <h2>{this.props.selectedSpot.reservation_name}</h2>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={8}>
                                            <Icon className="bump-up" size="large" name="user" />
                                            <h4 style={{ display: 'inline-block' }}>{this.props.selectedSpot.party_size}</h4>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Icon className="bump-up" size="large" name="clock" />
                                            <h4 style={{ display: 'inline-block' }}>{this.props.selectedSpot.quote_time}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={16}>
                                            <h5>Last Rejected Offer:</h5>
                                            <h4>${this.state.lastRejected ? this.state.lastRejected : 0}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column textAlign="center" width={8}>
                                <Input
                                    fluid
                                    type="number"
                                    label="$"
                                    value={this.state.offerPrice}
                                    // placeholder={this.state.lastRejected + 1}
                                    onChange={this.handleInput}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow} centered>
                            <Grid.Column width={8} textAlign="center">
                                <Button disabled={!this.state.offerPrice.length} onClick={this.makeOffer} color="green" fluid>Make Offer</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
                <Button attached="bottom" fluid onClick={() => this.props.history.push(`/venue/${this.props.selectedVenue.id}`)}>Back to Wait List</Button>

                <Modal
                    open={this.state.offerModal}
                    basic
                    size='small'
                >
                    <Header content='Offer Made!' />
                    <Modal.Content>
                        <h3>Your offer has been sent to {this.props.selectedSpot.reservation_name}</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.closeOfferModal} inverted>
                            <Icon name='checkmark' />
                            Great!
                        </Button>
                    </Modal.Actions>
                </Modal>
             
            </>
        )
    }
}

const MapStateToProps = reduxState => ({
    reduxState, 
    user: reduxState.user,
    selectedVenue: reduxState.selectedVenue,
    selectedSpot: reduxState.selectedSpot,
    customerRating: reduxState.customerRating,
})

export default connect(MapStateToProps)(NonUserSpot);