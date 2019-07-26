import React, { Component } from 'react'

import './LoadingPage.css'

class LoadingPage extends Component {
    render() {
        return (
            <div id="loadingPage">
                <div id="logoWrapper">
                    <div>
                        <h1>Budge</h1>
                        <span id="leftDot"></span>
                        <span id="rightDot"></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadingPage