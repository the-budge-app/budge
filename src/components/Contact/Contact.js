import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Icon, Rating, Input, Segment } from 'semantic-ui-react'

const styles={
    mainDiv:{
        textAlign: 'center',
    }
}

class Contact extends Component {
    render() {
        return (
            <div style={styles.mainDiv}>
                <Segment>
            <h2>Contact Us at Budge!</h2>
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Contact);