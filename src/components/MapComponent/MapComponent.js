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
        },
        h4Tag: {
            margin: '5px',
            textAlign: 'center',
            fontSize: '1.25rem',
        }

    }
}

class Map extends Component {

    state = {
        selectedVenue: {}
    }

    setSelectedVenue = (venue) => {
        // when one venue is clicked, set the data for that venue in local state
        // move this to redux later
        this.setState({
            ...this.state,
            selectedVenue: venue,
        })
        console.log('venue is selected', venue)
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
        this.props.dispatch({type: 'FETCH_SELECTED_VENUE', payload: this.state.selectedVenue.id});
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
                                    <Grid.Column style={styles.infoWindow.gridColumn} width={16}>
                                        <h4 style={styles.infoWindow.h4Tag}>{this.state.selectedVenue.restaurant_name}</h4>
                                    </Grid.Column>
                                    <Grid.Column style={styles.infoWindow.gridColumn} width={16}>
                                        <p style={styles.infoWindow.pTag}>{this.state.selectedVenue.address}</p>
                                        <p style={styles.infoWindow.pTag}>{this.state.selectedVenue.city}</p>
                                        {/* format phone number to be pretty later */}
                                        <p style={styles.infoWindow.pTag}>{this.state.selectedVenue.phone_number}</p>
                                    </Grid.Column>
                                    <Grid.Column style={{...styles.infoWindow.gridColumn, textAlign: 'center', paddingTop: '10px'}} width={16}>
                                        <Button onClick={this.viewVenue} size="mini">View</Button>
                                    </Grid.Column>
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