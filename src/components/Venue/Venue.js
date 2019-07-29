import React, { Component } from 'react'
import { connect } from 'react-redux'
import Logout from '../LogOutButton/LogOutButton';

class Venue extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_VENUE_INFO',
            payload: { restaurant_id: 1}
        })
    }
    render() {
        return (
            <>
            <h1>Venue Page</h1>
            <Logout />
            {/* <pre>
                {JSON.stringify(this.props.venueInfo, null, 2)}
            </pre> */}
            {this.props.venueInfo.length && 
            <>
            <h2>{this.props.venueInfo[0].restaurant_name}</h2>
            <h2>{this.props.venueInfo[0].address}</h2>
            <h2>{this.props.venueInfo[0].phone_number}</h2>
            <ul>
                {this.props.venueInfo.map(venue => 
                <table>
                    <tbody>
                        <tr key={venue.id}>
                            <td>{venue.party_size} persons</td>
                            <td>{venue.quote_time} min</td>
                            {venue.offer_status_code?
                            <td>$ {venue.offer_price}</td>
                            :
                            <td>NA</td>}
                        </tr>
                    </tbody>

                </table>)}
            </ul>
            </>
            }
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    venueInfo: reduxState.venueInfo
});
export default connect(mapStateToProps)(Venue);