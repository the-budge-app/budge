import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapComponent from '../MapComponent/MapComponent'

// import Semantic UI Components 
import { Modal, Button, Icon, Header } from 'semantic-ui-react'

import './HomeMap.css'
// import Google Maps API key
const MAPS_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

class HomeMap extends Component {

    state = {
        locationErrorMsg: '',
        locationError: false,
    }

    componentDidMount() {
        this.getVenues();
        this.checkUserLocation();
    }

    getVenues = () => {
        this.props.dispatch({ type: 'FETCH_VENUE_LIST' })
    }

    // if user refreshes, redux location is blown away, so get it again
    // move user location into cookie sessions later
    checkUserLocation = () => {
        if (!this.props.user.lat) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation, this.setPositionError)
        }
    }

    // function to set user location in the user object in redux
    setUserLocation = (position) => {
        this.props.dispatch({
            type: 'SET_USER_LOCATION', payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        })
    }

    // function to set user location in the user object in redux
    setUserLocation = (position) => {
        this.props.dispatch({
            type: 'SET_USER_LOCATION', payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        })

    }

    // set local state error data if there was an error with retrieving location
    setPositionError = (error) => {
        switch (error.code) {
            case 1:
                this.setState({
                    ...this.state,
                    locationErrorMsg: "User denied the request for Geolocation.",
                    locationError: true,
                })
                break;
            case 2:
                this.setState({
                    ...this.state,
                    locationErrorMsg: "Location information is unavailable.",
                    locationError: true,
                })
                break;
            case 3:
                this.setState({
                    ...this.state,
                    locationErrorMsg: "The request to get user location timed out.",
                    locationError: true,
                })
                break;
            default:
                this.setState({
                    ...this.state,
                    locationErrorMsg: "An unknown error occurred getting user location.",
                    locationError: true,
                })
                break;
        }
    }

    handleErrorModalClose = () => {
        this.setState({
            ...this.state,
            locationError: false,
            locationErrorMsg: '',
        })
        this.props.history.push('/loading');
    }

    render() {
        return (
            <>
            <p onClick={()=>this.setState({locationError: !this.state.locationError})}>click me</p>
                <div className="mapContainer">
                    <MapComponent
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: "100%" }} />}
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "100%" }} />}
                        defaultLat={Number(this.props.user.latitude)}
                        defaultLong={Number(this.props.user.longitude)}
                        history={this.props.history}
                        className="mapContainer"
                    />
                </div>

                {/* Below is the dialog for error on getting user location */}
                <Modal
                    open={this.state.locationError}
                    onClose={this.handleErrorModalClose}
                    basic
                    size='small'
                >
                    <Header icon='crosshairs' content='Location Services Required' />
                    <Modal.Content>
                        <h3>{this.state.locationErrorMsg}</h3>
                        <h3>Please ensure location services are enabled in your browser.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleErrorModalClose} inverted>
                            <Icon name='checkmark' />Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    user: reduxState.user,
})

export default connect(mapStateToProps)(HomeMap);