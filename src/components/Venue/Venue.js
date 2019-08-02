import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Checkbox, Grid } from 'semantic-ui-react';
import './Venue.css';
import WaitlistFooter from '../Footer/WaitlistFooter';

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
        //then update the local state to the wording on the button
        this.setState({
            active: !this.state.active
        })
    }
    //function to join waitlist
    joinWL = () => {
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
    //function to reroute to the selected venue page for logged in user, otherwise to login page (selected page is a protected route)
    handleSelectSpot = (waitlist_id) => {
        this.props.history.push(`/waitlist-spot/${waitlist_id}`);
        // if(!this.props.user.id || this.props.userWaitlist.id) {
        //     this.props.history.push(`/waitlist-spot/${waitlist_id}`);
        // } else {
        //     this.props.history.push(`/join-waitlist/${this.props.match.params.id}`)
        // }
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
            <div style={styles.mainDiv}>
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

                <br />
                <br />
                <br />

                {/* tried to clean up the map function
                made the primary prop based on the conditional */}
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.venueInfo && this.props.venueInfo.map(venue =>
                                <Button key={venue.waitlist_id} style={{ marginBottom: '15px', }} fluid primary={venue.user_id === this.props.user.id} onClick={() => this.handleSelectSpot(venue.waitlist_id)}>
                                    <Icon name="user" />{venue.party_size}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            
                        <Icon name="clock" />{venue.latest_wait_time}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            
                        <Icon name="dont" />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        $ {venue.rejected_price[0]}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                            )}
                            {this.state.active ?
                                <Button className="joinButton" fluid toggle active={active} onClick={this.joinWL}>Join Waitlist</Button>
                                :
                                <Button className="joinButton" fluid toggle active={active} onClick={this.leaveWL}>Leave Waitlist</Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <WaitlistFooter />
            </div>
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


{/* venue.user_id === this.props.user.id ?
                
<>
    <Button key={venue.waitlist_id} fluid primary onClick={() => this.handleSelectSpot(venue.waitlist_id)}>
        <Icon name="user" />{venue.party_size}
        <Icon name="clock" />{venue.quote_time}
        <Icon name="dont" />
        $ {venue.rejected_price[0]}

    </Button>
    <br />
</>
:
<>
    <Button key={venue.waitlist_id} fluid onClick={() => this.handleSelectSpot(venue.waitlist_id)}>
        <Icon name="user" />{venue.party_size}
        <Icon name="clock" />{venue.quote_time}
        <Icon name="dont" />
        $ {venue.rejected_price[0]}

    </Button>
    <br />
</> */}