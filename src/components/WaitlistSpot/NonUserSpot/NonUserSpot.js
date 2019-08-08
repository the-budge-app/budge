import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// import Semantic UI Component 
import { Grid, Segment, Button, Icon, Rating, Input, Modal, Header } from 'semantic-ui-react'

const styles = {
    icon: {
        fontSize: '15vw',
        marginBottom: '10px',
    },
    gridRow: {
        paddingTop: '0',
        paddingBottom: '0',
    },
    partyData: {
        margin: '0',
    },
    headingTwo: {
        fontWeight: '300',
        fontSize: '2rem',
        textTransform: 'capitalize',
    },
    headingFour: {
        fontWeight: '300',
        letterSpacing: '1px',
    },
    headingFive: {
        fontWeight: '300',
        letterSpacing: '1px',
        margin: '0',
    },
    backButton: {
        position: 'absolute',
        bottom: '0',
        padding: '20px 0px',
        fontWeight: '300',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    }
}

class NonUserSpot extends Component {

    state = {
        lastRejected: '',
        userRating: 0,
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
                <Segment attached >
                    <Grid id="spotData">
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={6} textAlign="center">
                                <Icon circular bordered name="user" color="grey" style={styles.icon} />
                            </Grid.Column>
                            <Grid.Column width={10} style={{ paddingLeft: '0', marginTop: '15px' }}>
                                <Grid>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={16} style={{ marginBottom: '4px', }}>
                                            <h2 style={styles.headingTwo}>{this.props.selectedSpot.username}</h2>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={16}>
                                            <Rating rating={this.props.customerRating.rating && this.props.customerRating.rating.substring(0, 1)} maxRating={5} disabled size='large' />
                                            <h5 style={{ margin: '0' }}>{this.props.customerRating.rating && this.props.customerRating.rating.substring(0, 3)}</h5>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={16}>
                                <h5 style={{ ...styles.headingFive, display: 'inline-block' }}>Party Size: {this.props.selectedSpot.party_size}</h5>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <h5 style={{ ...styles.headingFive, display: 'inline-block' }}>Wait Time: {this.props.selectedSpot.latest_wait_time} mins</h5>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={16} textAlign="center" style={{ marginTop: '10px' }}>
                                <h5 style={styles.headingFive}>Last Rejected Offer: ${this.state.lastRejected ? this.state.lastRejected : 0}</h5>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column textAlign="center" width={8}>
                                <Input
                                    fluid
                                    type="number"
                                    label="$"
                                    value={this.state.offerPrice}
                                    placeholder= 'Enter Offer'
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
                <Button style={styles.backButton} fluid onClick={() => this.props.history.push(`/venue/${this.props.selectedVenue.id}`)}>Back to Wait List</Button>

                <Modal
                    open={this.state.offerModal}
                    basic
                    size='small'
                >
                    <Header content='Offer Made!' />
                    <Modal.Content>
                        <h3>Your offer has been sent to {this.props.selectedSpot.username}</h3>
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