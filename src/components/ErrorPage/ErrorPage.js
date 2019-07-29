import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'

class errorPage extends Component {
    render() {
        return (
            <>
                <Grid centered>
                    <Grid.Column width={12} textAlign="center">
                        <h1>What the Budge?</h1>
                        <h3>This page doesn't exist</h3>
                        <h3>Let's Budge you back to where you belong.</h3>
                        <Button onClick={()=>this.props.history.push('/home')}>Alright</Button>
                    </Grid.Column>
                </Grid>
            </>
        )
    }
}

export default connect()(errorPage);