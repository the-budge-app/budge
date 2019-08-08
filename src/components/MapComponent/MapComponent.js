
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps'
import { Grid, Button, Modal, Header, Icon } from 'semantic-ui-react'

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
        selectedVenue: {},
        tooFar: false,
        tooFarModal: false,
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

    checkDistance = () => {
        if( this.props.user.distance > 300 ) {
            this.setState({
                ...this.state, tooFar: true, tooFarModal: true,
            })
        } else {
            this.viewVenue();
        }
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
                        <Marker
                            key={this.props.user.id}
                            position={{
                                lat: Number(this.props.user.latitude),
                                lng: Number(this.props.user.longitude),
                            }}
                            icon='https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        />
                        {/* map through the list of venues in redux and put a marker on the map for each one */}
                        {this.props.venues && this.props.venues.map(venue => (
                            <Marker
                                key={venue.id}
                                position={{
                                    lat: Number(venue.latitude),
                                    lng: Number(venue.longitude),
                                }}
                                onClick={() => { this.setSelectedVenue(venue) }}
                                icon='https://maps.google.com/mapfiles/ms/icons/red-dot.png'
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
                                    <Grid.Row style={{ padding: '0' }}>
                                        <Grid.Column style={styles.infoWindow.gridColumn} textAlign="center" width={16}>
                                            <h3 style={styles.infoWindow.h3Tag}>{this.state.selectedVenue.restaurant_name}</h3>
                                        </Grid.Column>
                                        <Grid.Column style={styles.infoWindow.gridColumn} width={16} textAlign="center">
                                            <p style={styles.infoWindow.pTag}>
                                                {this.state.selectedVenue.address}
                                                <br />
                                                {this.state.selectedVenue.city}
                                                <br />
                                                {this.state.selectedVenue.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                                            </p>
                                        </Grid.Column>
                                        <Grid.Column style={{ ...styles.infoWindow.gridColumn, textAlign: 'center', paddingTop: '10px' }} width={16}>
                                            <Button onClick={this.checkDistance} style={styles.viewButton} basic color="green">View Waitlist</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </InfoWindow>
                        }
                    </GoogleMap>
                }

                {/* Modal for user too far */}
                <Modal
                    open={this.state.tooFarModal}
                    onClose={() => this.setState({...this.state, tooFarModal: false,})}
                    basic
                    size='small'
                >
                <Header icon='compass outline' content="Oh no! You're too far away" />
                    <Modal.Content>
                        <h3>You can still check out the waitlist and activity feed.</h3>
                        <h3>But you can't join cause you're too far away.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => this.props.history.push(`/venue/${this.state.selectedVenue.id}`)} inverted>
                            <Icon name='checkmark' />Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
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