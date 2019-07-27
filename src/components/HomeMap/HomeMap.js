import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapComponent from '../MapComponent/MapComponent'

// import Semantic UI Components
import { Grid, Modal, Button, Icon, Header } from 'semantic-ui-react'

import './HomeMap.css'

// import Google Maps API key
const MAPS_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

console.log(MAPS_KEY);

class HomeMap extends Component {

    state = {
        locationErrorMsg: '',
        locationError: false,

    }

    // when component mounts, check to see if browser can get user location
    componentDidMount() {
        this.checkForLocation();
    }

    // if browser can get location, try to get it
    // if successful, call setUserLocation function, otherwise, call setPositionError function
    checkForLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation, this.setPositionError)
        } else {
            this.setState({
                ...this.state,
                locationErrorMsg: 'Geolocation is not supported by this browser.',
                locationError: true,
            })
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

    handleModalClose = () => {
        this.setState({
            ...this.state,
            locationError: false,
            locationErrorMsg: '',
        })
    }

    render() {
        return (
            <>
                <h1 onClick={()=> {this.setState({...this.state, locationError: true, locationErrorMsg: 'Testing'})}}>Home Map Page</h1>
                <div className="mapContainer">
                    <MapComponent
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDdBV39IhRmDGVLRAB0h3-757S9XAvU684&v=3.exp&libraries=geometry,drawing,places`}
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
                    onClose={this.handleModalClose}
                    basic
                    size='small'
                >
                    <Header icon='crosshairs' content='Location Services Required' />
                    <Modal.Content>
                        <h3>{this.state.locationErrorMsg}</h3>
                        <h3>Please enable location in your browser.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleModalClose} inverted>
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