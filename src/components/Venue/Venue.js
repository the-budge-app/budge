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
    }

    toggleButton = () => {
        this.setState({
            active: !this.state.active
        })
    }
    handleClick = () => {
        console.log('button test');

    }
    render() {
        const { active } = this.state
        return (
            <>
                {/* waitlist information to be rendered on DOM - currently in table format
            - to be updated with semantic UI*/}
                <table>
                    {this.props.venueInfo.map(venue =>
                        <tbody>
                            <tr key={venue.waitlist_id}>
                                <td>{venue.party_size} persons</td>
                                <td>{venue.quote_time} min</td>
                                {venue.rejected_price[0] ?
                                    <td>$ {venue.rejected_price[0]}</td>
                                    :
                                    <td>NA</td>}
                            </tr>
                        </tbody>
                    )}
                </table>

                <div style={styles.mainDiv}>
                    {JSON.stringify(this.props.selectedVenue)}

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
                        <>
                            <Button key={venue.waitlist_id} fluid onClick={this.handleClick}>
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
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    venueInfo: reduxState.venueInfo,
    selectedVenue: reduxState.selectedVenue,
});
export default connect(mapStateToProps)(Venue);