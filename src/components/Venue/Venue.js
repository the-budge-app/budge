import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Venue.css';
import WaitlistFooter from '../Footer/WaitlistFooter';
import axios from 'axios'
import Login from '../LoginPage/LoginPage'

// import components from Semantic UI
import { Button, Icon, Checkbox, Grid, Segment, Modal, Header } from 'semantic-ui-react';

const styles = {
    mainDiv: {
        marginTop: '4%',
        textAlign: 'center',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

class Venue extends Component {
    state = {
        active: true, //store the on/off states between join/leave WL
        showAll: true, //store the on/off states between all spots vs. budgable spots
        joinErrorModal: false, // state for modal for join error
        loginModal: false, // modal to display the login 
        singleOfferModal: false,
    }

    componentDidMount() {
        console.log('Venue page mounted!');
        this.props.dispatch({ type: 'FETCH_USER' });

        //fetch WL info - default show all WL
        this.props.dispatch({
            type: 'FETCH_WAITLIST',
            payload: { restaurant_id: this.props.match.params.id, }
        })
        //fetch venue info
        this.props.dispatch({
            type: 'FETCH_SELECTED_VENUE',
            payload: this.props.match.params.id,
        })
        //fetch user's WL to check if the user has joined the WL in this restaurant
        //only run the code if user is logged in
        this.props.dispatch({
            type: 'FETCH_USER_WAITLIST',
            payload: this.props.match.params.id,
        })

        //refresh every minute
        this.interval = setInterval(() => this.props.dispatch({
            type: 'FETCH_WAITLIST',
            payload: { restaurant_id: this.props.match.params.id, }
        }), 60000)
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
                if ( response.status === 200 ) {
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
        // check to see if the user has an active offer out already
        axios.get('/api/offers/check-offers')
            .then(response => {
                // if we get the ok from the server, navigate to that page
                if(response.status === 200 ) {
                    this.props.history.push(`/waitlist-spot/${venue.waitlist_id}`);
                }
                else {
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
            })

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

    render() {
        const { active } = this.state
        return (
            <>
            <div style={styles.mainDiv}>
                <Segment style={{overflow: 'auto', maxHeight: 500 }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>

                            <h1>{this.props.selectedVenue.restaurant_name}</h1>
                            <h4>{this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(0, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(3, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(6, 4)} </h4>
                            <h4>{this.props.selectedVenue.address}</h4>
                            <h4>{this.props.selectedVenue.city} {this.props.selectedVenue.state}, {this.props.selectedVenue.zip}</h4>
                            <h3>Waitlist</h3>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {/* <h1>{this.props.selectedVenue.restaurant_name}</h1>
                <h4>{this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(0, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(3, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(6, 4)} </h4>
                <h4>{this.props.selectedVenue.address}</h4>
                <h4>{this.props.selectedVenue.city} {this.props.selectedVenue.state}, {this.props.selectedVenue.zip}</h4>
                <h3>Waitlist</h3> */}
                {/* conditional rendering - non log in user or logged in but not joined user will not see the toggle button */}
                {this.props.user.id && this.props.userWaitlist.id ?
                    <>
                        <label>All Parties</label>
                        <Checkbox toggle onChange={this.handleSwitch} ></Checkbox>
                        <label>Budgable</label>
                    </>
                    :
                    <>
                    </>
                }

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.venueInfo && this.props.venueInfo.map(venue =>
                                <Button key={venue.waitlist_id} style={{ marginBottom: '15px', }} fluid 
                                    // primary color if it is the spot of current user
                                    primary={venue.user_id === this.props.user.id}
                                    //secondary color if it is not the spot of current user  
                                    secondary={venue.user_id !== this.props.user.id}
                                    //button disabled if there is an active offer on this spot (waitlist status code = 3) 
                                    disabled={venue.waitlist_status_code === 3 && venue.user_id !== this.props.user.id}
                                    onClick={() => this.handleSelectSpot(venue)}>
                                    <Icon name="user" />{venue.party_size}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            
                                    <Icon name="clock" />{venue.latest_wait_time} min&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            
                                    <Icon name="dont" />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                    $ {venue.rejected_price[0]}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                </Button>
                            )}
                            {this.props.user.id && this.props.userWaitlist.id ? 
                                <Button className="joinButton" fluid toggle active={active} onClick={this.leaveWL}>Leave Waitlist</Button>
                                :
                                <Button disabled={this.props.user.distance > 99999850} className="joinButton" fluid toggle active={active} onClick={this.joinWL}>Join Waitlist</Button>
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
                    <Login closeLoginModal={() => this.setState({...this.state, loginModal: false,})}/>
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
                        <h3>Please wait for seller to respond before making another offer.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={()=>this.setState({...this.state, singleOfferModal: false})} inverted>
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
});
export default connect(mapStateToProps)(Venue);
