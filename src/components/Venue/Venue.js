import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Venue.css';
import WaitlistFooter from '../Footer/WaitlistFooter';
import axios from 'axios'
import Login from '../LoginPage/LoginPage'
import Register from '../RegisterPage/RegisterPage'

// import components from Semantic UI
import { Button, Icon, Checkbox, Grid, Segment, Modal, Header } from 'semantic-ui-react';

const styles = {
    mainDiv: {
        marginTop: '4%',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    restaurantName: {
        fontWeight: '300',
        letterSpacing: '2px',
        lineHeight: '1.25',
        fontSize: '2.25rem',
    },
    restaurantDetails: {
        lineHeight: '1.5',
        marginTop: '8px',
    },
    toggleLabel: {
        position: 'relative',
        bottom: '5px',
        fontSize: '1rem',
        letterSpacing: '1px',
    }
}

class Venue extends Component {
    state = {
        active: false, //store the on/off states between join/leave WL
        showAll: true, //store the on/off states between all spots vs. budgable spots
        joinErrorModal: false, // state for modal for join error
        loginModal: false, // modal to display the login 
        singleOfferModal: false, // modal to restrict user to single offer
        loggingIn: false, // state for logging user in
        tooFar: false, // boolean for if user is too far from restaurant
        tooFarModal: false, // modal to notify user is too far from 
    }

    componentDidMount() {
        console.log('Venue page mounted!');
        this.checkDistance();
        this.props.dispatch({type: 'FETCH_ALL_VENUE_DATA', payload: this.props.match.params.id})
        //refresh every minute
        this.interval = setInterval(() => this.props.dispatch({
            type: 'FETCH_WAITLIST',
            payload: { restaurant_id: this.props.match.params.id, }
        }), 60000)       
    }

    checkDistance = () => {
        if( this.props.user.distance > 300 ) {
            this.setState({
                ...this.state, tooFar: true, tooFarModal: true,
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //function to toggle between join/leave WL
    leaveWL = () => {
        //dispatch action to remove user from the waitlist of this restaurant first
        this.props.dispatch({ type: 'LEAVE_WAITLIST', payload: this.props.userWaitlist })
        //then update the local state to the wording on the button
        this.setState({
            active: !this.state.active
        })
        console.log(this.state)
    }
    
    //function to join waitlist
    joinWL = () => {
        // first thing if user tries to join waitlist is make sure they aren't active on another waitlist
        // only check if user is logged in
        if ( this.props.user.id ) {
            axios.get('/api/waitlist/check-waitlist-status')
            .then( response => {
                // if user is not active on a waitlist, let them join
                if ( !response.data.isActiveOnWaitlist ) {
                    this.props.history.push(`/join-waitlist/${this.props.match.params.id}`)
                    this.props.dispatch({
                        type: 'FETCH_SELECTED_VENUE',
                        payload: this.props.match.params.id,
                    })
                    //need to check if this user has successfully joined the WL
                    //then update the local state
                    this.setState({
                        active: !this.state.active,
                    })
                }
                // otherwise, open the error modal
                else {
                    this.setState({
                        ...this.state, 
                        joinErrorModal: true,
                    })
                }
            })
            .catch( error => console.log(error))
        }
        else {
            this.setState({
                ...this.state, 
                loginModal: true,
            })
        }
    }

    // function to other waitlist spot info page where user can make an offer on that spot
    handleSelectSpot = (venue) => {
        // if user is logged in, check to see if the user has an active offer out already
        if ( this.props.user.id ) {
            axios.get('/api/offers/check-offers')
            .then(response => {
                if( response.data.hasActiveOffer ) {
                    // here, we don't want to allow user to view another waitlist spot
                    // unless that spot is theirs, then its ok
                    if ( venue.user_id === this.props.user.id){
                        this.props.history.push(`/waitlist-spot/${venue.waitlist_id}`);
                    } else {
                        this.setState({
                            ...this.state, 
                            singleOfferModal: true,
                        })
                    }
                }
                else {
                    // if user doesn't have an active offer, allow navigation
                    this.props.history.push(`/waitlist-spot/${venue.waitlist_id}`);
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                loginModal: true,
            })
        }
    }

    //function to toggle between showing all spots or only budgable spots
    handleSwitch = () => {
        if (!this.state.showAll) {
            this.props.dispatch({
                type: 'FETCH_WAITLIST',
                payload: { restaurant_id: this.props.match.params.id, }
            })
        } else {
            this.props.dispatch({
                type: 'FETCH_BUDGABLE_WAITLIST',
                payload: { restaurant_id: this.props.match.params.id, }
            })
        }
        this.setState({
            showAll: !this.state.showAll,
        })
    }

    closeLoginRegisterModal = () => {
        this.setState({
            ...this.state, loggingIn: true,
        })
        setTimeout(() => {
            this.setState({
                ...this.state, loggingIn: false, loginModal: false,
            })
            this.props.dispatch({type: 'FETCH_ALL_VENUE_DATA', payload: this.props.match.params.id})
        }, 1500)
    }

    render() {
        return (
            <>
            <div style={styles.mainDiv}>
                <Segment style={{overflow: 'auto', maxHeight: 500 }}>
                <Grid>
                    <Grid.Row style={{padding: '0'}}>
                        <Grid.Column width={6}>
                            <h1 style={styles.restaurantName}>{this.props.selectedVenue.restaurant_name}</h1>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <h4 style={styles.restaurantDetails}>
                                {this.props.selectedVenue.address}
                                <br/>
                                {this.props.selectedVenue.city} {this.props.selectedVenue.state}, {this.props.selectedVenue.zip}
                                <br />
                                ({this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(0, 3)}) {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(3, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(6, 4)}
                            </h4>                           
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {/* conditional rendering - non log in user or logged in but not joined user will not see the toggle button */}
                {this.props.user.id && this.props.userWaitlist.id &&
                    <Grid>
                        <Grid.Column width={16} textAlign="center">
                            <label style={{marginRight: '10px', ...styles.toggleLabel}}>All Parties</label>
                            <Checkbox toggle onChange={this.handleSwitch} ></Checkbox>
                            <label style={{marginLeft: '10px', ...styles.toggleLabel}}>Budgable</label>
                        </Grid.Column>
                    </Grid>
                }
                <Grid centered>
                    <Grid.Row style={{padding: '0', marginTop: '20px'}}>
                        <Grid.Column width={5}><h4>Party Size</h4></Grid.Column>
                        <Grid.Column width={5}><h4>Wait Time</h4></Grid.Column>
                        <Grid.Column width={5}><h4>Last Offer</h4></Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid style={{marginTop: '0'}}>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.venueInfo && this.props.venueInfo.map(venue =>
                                <Button key={venue.waitlist_id} style={{ marginBottom: '15px', }} fluid 
                                    // primary color if it is the spot of current user
                                    primary={venue.user_id === this.props.user.id}
                                    //secondary color if it is not the spot of current user  
                                    secondary={venue.user_id !== this.props.user.id}
                                    //button disabled if there is an active offer on this spot (waitlist status code = 3) 
                                    disabled={(venue.waitlist_status_code === 3 && venue.user_id !== this.props.user.id) || (this.props.userWaitlist.party_size && venue.party_size !== this.props.userWaitlist.party_size) }
                                    onClick={() => this.handleSelectSpot(venue)}>
                                    <Icon name="user" />{venue.party_size}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            
                                    <Icon name="clock" />{venue.latest_wait_time} min&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            
                                    <Icon name="dont" />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                    $ {venue.rejected_price[0]}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>
                            )}
                            {this.props.user.id && this.props.userWaitlist.id && (this.props.userWaitlist.status_code === 1 || this.props.userWaitlist.status_code === 3) ? 
                                <Button className="joinButton" fluid color="red" onClick={this.leaveWL}>Leave Waitlist</Button>
                                :
                                <Button disabled={this.state.tooFar} className="joinButton" color="green" fluid onClick={this.joinWL}>Join Waitlist</Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
            </div>
            <WaitlistFooter />

            {/* Below is the dialog for error on getting user location */}
            <Modal
                    open={this.state.joinErrorModal}
                    basic
                    size='small'
                >
                    <Header icon='ban' content='Cannot Join Waitlist' />
                    <Modal.Content>
                        <h3>You are already active on another waitlist.</h3>
                        <h3>Please leave other waitlist if you want to join this waitlist.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={()=>this.setState({...this.state, joinErrorModal: false})} inverted>
                            <Icon name='checkmark' />Ok
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/* Modal for login */}
                <Modal
                    open={this.state.loginModal}
                    onClose={() => this.setState({...this.state, loginModal: false,})}
                    basic
                    size='small'
                >   
                {this.props.loginMode === 'login' && !this.state.loggingIn &&
                    <>              
                        <Modal.Actions>
                            <Icon name='close' onClick={() => this.setState({...this.state, loginModal: false,})}/>
                        </Modal.Actions>
                        <Header style={{textAlign: 'center'}} content='Please Log In' />
                    </>
                    }
                    <Modal.Content>
                        {this.state.loggingIn ? 
                        <>
                            <Grid centered>
                                <Grid.Column width={12} textAlign="center">
                                    <h2>Logging in...</h2>
                                </Grid.Column>
                                <Grid.Column width={12} textAlign="center">
                                    <Icon name="spinner" size="huge" loading={this.state.loggingIn} />
                                </Grid.Column>
                            </Grid>
                        </>
                        :
                        <>
                        {this.props.loginMode === 'login' ?
                        <Login closeLoginModal={this.closeLoginRegisterModal}/>
                        :
                        <Register closeLoginModal={this.closeLoginRegisterModal} />
                        }
                    </>
                        }
                    </Modal.Content>
                </Modal>

                {/* Modal for single offer */}
                <Modal
                    open={this.state.singleOfferModal}
                    onClose={() => this.setState({...this.state, singleOfferModal: false,})}
                    basic
                    size='small'
                >
                <Header icon='ban' content='Cannot Make Multiple Offers' />
                    <Modal.Content>
                        <h3>You already have an active offer pending.</h3>
                        <h3>Please wait for seller to respond OR retract your offer before making another offer.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={()=>this.setState({...this.state, singleOfferModal: false})} inverted>
                            <Icon name='checkmark' />Ok
                        </Button>
                    </Modal.Actions>
                </Modal>

                 {/* Modal for user too far */}
                 <Modal
                    open={this.state.tooFarModal}
                    onClose={() => this.setState({...this.state, tooFarModal: false,})}
                    basic
                    size='small'
                >
                <Header icon='compass outline' content="Oh no! You're too far away" />
                    <Modal.Content>
                        <h3>You can still check out the waitlist and activity feed.</h3>
                        <h3>But you can't join cause you're too far away.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={()=>this.setState({...this.state, tooFarModal: false})} inverted>
                            <Icon name='checkmark' />Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    venueInfo: reduxState.venueInfo,
    selectedVenue: reduxState.selectedVenue,
    user: reduxState.user,
    userWaitlist: reduxState.userWaitlist,
    loginMode: reduxState.loginMode,
});
export default connect(mapStateToProps)(Venue);