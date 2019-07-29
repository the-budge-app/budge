import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps'

class Map extends Component {

    state = {
        lat: null,
        long: null,
        // venueList: [
        //     {
        //         latitude: 44.983550,
        //         longitude: -93.269526,
        //     },
        //     {
        //         latitude: 44.983616,
        //         longitude: -93.271683,
        //     },
        //     {
        //         latitude: 44.987640,
        //         longitude: -93.276965,
        //     },
        //     {
        //         latitude: 44.986472,
        //         longitude: -93.275365,
        //     },
        //     {
        //         latitude: 44.984033,
        //         longitude: -93.254192,
        //     }
        // ],
        selectedVenue: {
            latitude: null,
            longitude: null,
        }
    }

    setSelectedVenue = (venue) => {
        // when one venue is clicked, set the data for that venue in local state
        // move this to redux later
        this.setState({
            ...this.state,
            selectedVenue: {
                latitude: venue.latitude,
                longitude: venue.longitude,
            }
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
            selectedVenue: {
                latitude: null,
                longitude: null
            }
        })
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
                            minZoom: 3.25,
                        }}
                        defaultZoom={10.75}
                        defaultCenter={{ lat: this.props.defaultLat, lng: this.props.defaultLong }}
                    >
                        {/* map through the list of venues in redux and put a marker on the map for each one */}
                        {this.props.venues && this.props.venues.map((venue, index) => (
                            <Marker
                                key={index}
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
                            <>
                                { this.props.user.distance && <h4>You are {this.props.user.distance} meters away.</h4>}
                            </>
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