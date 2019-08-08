import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// import components
import UserSpot from './UserSpot/UserSpot'
import NonUserSpot from './NonUserSpot/NonUserSpot'
import AddFunds from '../PaymentPage/SelectPaymentTab'

import './WaitlistSpot.css'

// import Semantic UI components
import { Button, Icon, Grid, Modal, Header } from 'semantic-ui-react'

class SelectedOffer extends Component {

    state = {
        modalOpen: false,
    }

    componentDidMount() {
        console.log('the offer id is', this.props.match.params.id);
        this.getSelectedSpot();
    }

    getSelectedSpot = () => {
        this.props.dispatch({ type: 'FETCH_SELECTED_SPOT_DATA', payload: this.props.match.params.id });
    }

    toggleModal = () => {
        this.setState({
            ...this.state,
            modalOpen: !this.state.modalOpen,
        })
    }


    render() {
        return (
            <>

                {/* protected route checks to see if user is logged in.
                once they are logged in, check to see if they are on the waitlist */}
                {!this.props.userWaitlist.id ?
                    <>
                        {this.props.selectedVenue.id ?
                            <Redirect to={`/join-waitlist/${this.props.selectedVenue.id}`} />
                            :
                            <Redirect to={`/home`} />
                        }
                    </>
                    :
                    <>
                        {
                            this.props.selectedSpot.user_id === this.props.user.id ?
                                <UserSpot history={this.props.history} toggleModal={this.toggleModal} />
                                :
                                <NonUserSpot history={this.props.history} match={this.props.match} toggleModal={this.toggleModal} />
                        }

                        {/* Below is the dialog for error on getting user location */}
                        <Modal
                            open={this.state.modalOpen}
                            basic
                            size='small'
                        >
                            <Grid centered>
                                <Grid.Column width={16}>
                                    <Header style={{ color: 'white' }} icon='credit card' content='Not Enough Funds' />
                                    <Modal.Content>
                                        <h3>Please add funds to your account</h3>
                                        <AddFunds toggleModal={this.toggleModal} />
                                    </Modal.Content>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Grid.Row>
                                        <Modal.Actions>
                                            <Button style={{ margin: '0' }} color='red' fluid onClick={this.toggleModal} inverted>
                                                <Icon name='ban' />Cancel
                                        </Button>
                                        </Modal.Actions>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Modal>
                    </>
                }




            </>
        )
    }
}

const mapStateToProps = reduxState => ({
    user: reduxState.user,
    selectedVenue: reduxState.selectedVenue,
    selectedSpot: reduxState.selectedSpot,
    userWaitlist: reduxState.userWaitlist,
});
export default connect(mapStateToProps)(SelectedOffer);