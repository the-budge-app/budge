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
            payload: { restaurant_id: 1 }
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
                <ul>
                    {this.props.venueInfo.map(venue => 
                    <table>
                        <tbody>
                            <tr key={venue.id}>
                                <td>{venue.party_size} persons</td>
                                <td>{venue.quote_time} min</td>
                                {venue.rejected_price[0]?
                                <td>$ {venue.rejected_price[0]}</td>
                                :
                                <td>NA</td>}
                            </tr>
                        </tbody>

                    </table>)}
                </ul>
            
                <div style={styles.mainDiv}>

                    <h3>{this.props.venueInfo.length && this.props.venueInfo[0].restaurant_name}</h3>
                    <h4>phone number</h4>
                    <h4>Address</h4>

                    <h3>Waitlist</h3>

                    <label>Budgable</label>
                    <Checkbox toggle></Checkbox>
                    <label>All Parties</label>
                    <br />
                    <br />
                    <br />
                    <Button fluid onClick={this.handleClick}><Icon name="user" />Party Size  <Icon name="clock" />Quoted Time<Icon name="dont" />Last rejected Offer</Button>
                    <br />
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
        venueInfo: reduxState.venueInfo
    });
    export default connect(mapStateToProps)(Venue);