import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Checkbox } from 'semantic-ui-react';

const styles = {
    mainDiv: {
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
    }
    //function to toggle between join/leave WL
    toggleButton = () => {
        this.setState({
            active: !this.state.active
        })
        
    }
    //function to reroute to the selected venue page for logged in user, otherwise to login page (selected page is a protected route)
    handleClick = (waitlist_id) => {
        this.props.history.push(`/selected-offer/${waitlist_id}`);
    }

    //function to toggle between showing all spots or only budgable spots
    handleSwitch = () => {        
        if(!this.state.showAll) {
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
                <h3>{this.props.selectedVenue.restaurant_name}</h3>
                <h4>{this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(0, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(3, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(6, 4)} </h4>
                <h4>{this.props.selectedVenue.address}</h4>
                <h4>{this.props.selectedVenue.city} {this.props.selectedVenue.state}, {this.props.selectedVenue.zip}</h4>
                <h3>Waitlist</h3>
                {/* conditional rendering - non log in user will not see the toggle button */}
                {this.props.user.id?
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
                {this.props.venueInfo.map(venue => 
                venue.user_id === this.props.user.id ?
                    <>
                        <Button key={venue.waitlist_id} fluid primary onClick={() => this.handleClick(venue.waitlist_id)}>
                            <Icon name="user" />{venue.party_size}
                            <Icon name="clock" />{venue.quote_time}
                            <Icon name="dont" />
                            $ {venue.rejected_price[0]}

                        </Button>
                        <br />
                    </>
                    :
                    <>
                        <Button key={venue.waitlist_id} fluid onClick={() => this.handleClick(venue.waitlist_id)}>
                            <Icon name="user" />{venue.party_size}
                            <Icon name="clock" />{venue.quote_time}
                            <Icon name="dont" />
                            $ {venue.rejected_price[0]}

                        </Button>
                        <br />
                    </>

                )}
                {this.state.active ?
                    <Button fluid toggle active={active} onClick={this.toggleButton}>Join Waitlist</Button>
                    :
                    <Button fluid toggle active={active} onClick={this.toggleButton}>Leave Waitlist</Button>
                }
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    venueInfo: reduxState.venueInfo,
    selectedVenue: reduxState.selectedVenue,
    user: reduxState.user,
});
export default connect(mapStateToProps)(Venue);