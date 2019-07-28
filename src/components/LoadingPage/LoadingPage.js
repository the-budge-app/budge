import React, { Component } from 'react'
import { connect } from 'react-redux'

// import Semantic UI Components
import { Grid, Modal, Button, Icon, Header } from 'semantic-ui-react'

import './LoadingPage.css'

class LoadingPage extends Component {

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
            <div id="loadingPage">
                <Grid id="logoContainer" centered>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column width={12} textAlign="center">
                            <div id="logoWrapper">
                                <h1 onClick={()=> {this.setState({...this.state, locationError: true, locationErrorMsg: 'Testing'})}}>Budge</h1>
                                <span id="leftDot"></span>
                                <span id="rightDot"></span>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Button color='green' basic size="big" disabled={!this.props.user.latitude} loading={!this.props.user.latitude} onClick={() => this.props.history.push('/map')}>Get Budging!</Button>

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
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    user: reduxState.user,
})
export default connect(mapStateToProps)(LoadingPage);