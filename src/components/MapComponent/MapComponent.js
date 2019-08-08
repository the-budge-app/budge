
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps'
import { Grid, Button } from 'semantic-ui-react'

const styles = {
    infoWindow: {
        gridColumn: {
            padding: '0',
        },
        pTag: {
            margin: '0',
            marginTop: '6px',
            fontSize: '1.1rem',
        },
        h3Tag: {
            margin: '5px',
            fontWeight: '300',
            letterSpacing: '2px',
            display: 'inline-block',
            borderBottom: '1px solid black',
            textAlign: 'center',
            fontSize: '1.5rem',
        }
    },
    viewButton: {
        fontSize: '.9rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    }
}

class Map extends Component {

    state = {
        selectedVenue: {}
    }

    setSelectedVenue = (venue) => {
        // when one venue is clicked, set the data for that venue in local state
        this.setState({
            ...this.state,
            selectedVenue: venue,
        })
        // set distance away from venue when user clicks venue marker
        this.props.dispatch({
            type: 'SET_USER_DISTANCE', payload: {
                userCoords: { latitude: this.props.user.latitude, longitude: this.props.user.longitude },
                venueCoords: { latitude: venue.latitude, longitude: venue.longitude }
            }
        })
    }

    closeInfoWindow = () => {
        this.setState({
            ...this.state,
            selectedVenue: {},
        })
    }

    viewVenue = () => {
        this.props.history.push(`/venue/${this.state.selectedVenue.id}`);
    }

    render() {
        return (
            <>
                {this.props.defaultLat &&
                    <GoogleMap
                        defaultOptions={{
                            streetViewControl: false,
                            fullscreenControl: false,
                            controlSize: 20,
                            minZoom: 12,
                        }}
                        defaultZoom={14.25}
                        defaultCenter={{ lat: this.props.defaultLat, lng: this.props.defaultLong }}
                    >
                        {/* map through the list of venues in redux and put a marker on the map for each one */}
                        {this.props.venues && this.props.venues.map(venue => (
                            <Marker
                                key={venue.id}
                                position={{
                                    lat: Number(venue.latitude),
                                    lng: Number(venue.longitude),
                                }}
                                onClick={() => { this.setSelectedVenue(venue) }}
                            />
                        ))}

                        {/* when user clicks on a venue, selectedVenue is set, and infoWindow will display */}
                        {this.state.selectedVenue.latitude &&
                            <InfoWindow
                                position={{
                                    lat: Number(this.state.selectedVenue.latitude),
                                    lng: Number(this.state.selectedVenue.longitude),
                                }}
                                onCloseClick={this.closeInfoWindow}

                            >
                                <Grid>
                                    <Grid.Row style={{padding: '0'}}>
                                        <Grid.Column style={styles.infoWindow.gridColumn} textAlign="center" width={16}>
                                            <h3 style={styles.infoWindow.h3Tag}>{this.state.selectedVenue.restaurant_name}</h3>
                                        </Grid.Column>
                                        <Grid.Column style={styles.infoWindow.gridColumn} width={16} textAlign="center">
                                            <p style={styles.infoWindow.pTag}>
                                                {this.state.selectedVenue.address}
                                                <br/>
                                                {this.state.selectedVenue.city}
                                                <br/>
                                                {this.state.selectedVenue.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                                            </p>
                                        </Grid.Column>
                                        <Grid.Column style={{ ...styles.infoWindow.gridColumn, textAlign: 'center', paddingTop: '10px' }} width={16}>
                                            <Button onClick={this.viewVenue} style={styles.viewButton} basic color="green">View Waitlist</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </InfoWindow>
                        }
                    </GoogleMap>
                }
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    user: reduxState.user,
    venues: reduxState.venues,
})

const MapComponent = withScriptjs(withGoogleMap(Map));

export default connect(mapReduxStateToProps)(MapComponent);