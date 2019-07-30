import React, { Component } from 'react'
import { connect } from 'react-redux'

import './SelectedOffer.css'

// import Semantic UI components
import { Grid, Button, Icon, Rating, Input, Segment } from 'semantic-ui-react'

const styles = {
    icon: {
        fontSize: '15vw',
        marginBottom: '10px',
        marginTop: '10px',
    },
    gridRow: {
        paddingTop: '0',
        paddingBottom: '0',
    },
    partyData: {
        margin: '0',
    }
}

class SelectedOffer extends Component {

    state = {
        lastRejected: 25,
        userRating: 4.5,
        offerPrice: '',
    }

    componentDidMount() {
        console.log('the offer id is', this.props.match.params.id);
        this.getSelectedOffer();
    }

    getSelectedOffer = () => {
        this.props.dispatch({ type: 'FETCH_SELECTED_OFFER', payload: this.props.match.params.id });
    }

    handleInput = (event) => {
        this.setState({
            ...this.state, 
            offerPrice: event.target.value,
        })
    }

    makeOffer = () => {
        console.log(this.state.offerPrice);
        // check user account balance
        // load modal if user doesn't have enough
        // otherwise, fire off make offer saga probably 
        this.setState({
            ...this.state, 
            offerPrice: '',
        })
    }


    render() {
        return (
            <>
                <Segment attached >

                    <Grid id="spotData">
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={6} textAlign="center">
                                <Icon circular bordered name="user" color="grey" style={styles.icon} />
                                <Rating defaultRating={this.state.userRating} maxRating={5} disabled size='large' />
                                <h5>{this.state.userRating}</h5>
                            </Grid.Column>
                            <Grid.Column width={10} style={{ paddingLeft: '0' }}>
                                <Grid>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={16}>
                                            <h2>UserName</h2>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={8}>
                                            <Icon className="bump-up" size="big" name="user" />
                                            <h3>4</h3>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Icon className="bump-up" size="big" name="clock" />
                                            <h3>4</h3>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row style={styles.gridRow}>
                                        <Grid.Column width={16}>
                                            <h5>Last Rejected Offer:</h5>
                                            <h4>${this.state.lastRejected}</h4>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column textAlign="center" width={8}>
                                <Input
                                    fluid
                                    type="number"
                                    label="$"
                                    value={this.state.offerPrice}
                                    placeholder={this.state.lastRejected + 1}
                                    onChange = {this.handleInput}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow} centered>
                            <Grid.Column width={8} textAlign="center">
                                <Button onClick={this.makeOffer} color="green" fluid>Make Offer</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
                <Button attached="bottom" fluid>Back to Wait List</Button>
            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(SelectedOffer);