import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Sidebar, Menu, Card, Icon, Image, Rating, Checkbox } from 'semantic-ui-react';

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
        active: true,
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_VENUE_INFO',
            payload: { restaurant_id: this.props.match.params.id }
        })

        this.props.dispatch({
            type: 'FETCH_SELECTED_VENUE',
            payload: this.props.match.params.id,
        })
    }

    toggleButton = () => {
        this.setState({
            active: !this.state.active
        })
    }
    handleClick = (waitlist_id) => {
        console.log('button test');
        this.props.history.push(`/selected-offer/${waitlist_id}`);
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

                <label>Budgable</label>
                <Checkbox toggle></Checkbox>
                <label>All Parties</label>
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