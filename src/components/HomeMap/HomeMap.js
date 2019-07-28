import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapComponent from '../MapComponent/MapComponent'

import './HomeMap.css'
// import Google Maps API key
const MAPS_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

class HomeMap extends Component {
    render() {
        return (
            <>
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
            </>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    user: reduxState.user,
})

export default connect(mapStateToProps)(HomeMap);