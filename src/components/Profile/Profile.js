import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Input, Button, Icon, Grid, Modal, Header, Segment, Rating } from 'semantic-ui-react';
import './Profile.css';

class Profile extends Component {
    state = {
        EditModeOn: false,
        modalOpen: false,
        username: this.props.user.username,
        email_address: this.props.user.email_address,
        phone_number: this.props.user.phone_number,
        id: this.props.user.id
    }

componentDidMount(){
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_RATING', payload: this.props.user.id });
}

    toggleEditMode = () => {
        this.setState({
            EditModeOn: !this.state.EditModeOn
        })
    }

    handleChange = (profileAttribute) => (event) => {
        this.setState({
            ...this.state,
            [profileAttribute]: event.target.value,

        });
    }

    handleSubmit = () => {
        console.log(this.state);
        this.props.dispatch({ type: 'EDIT_PROFILE', payload: this.state });
    }

    toggleModal = () => {
        this.setState({
            ...this.state,
            modalOpen: !this.state.modalOpen,
        })
    }

    handleDeleteAcct = () => {
        this.props.dispatch({ type: "DELETE_ACCOUNT", payload: this.props.user.id })
            
                this.props.history.push('/home')
    //when this function runs and brings user back to map page,
    //if they navigate back to /profile, their user still shows up
    //until hard refresh of the page        

    }



    render() {
        return (
            <>
                <center>
                <Segment style={{overflow: 'auto', maxHeight: 600 }}>
                    <Grid className="profile">
                        <Grid.Row>
                            <Grid.Column>
                                <Icon
                                    id="editMode"
                                    name="cog"
                                    size="big"
                                    onClick={this.toggleEditMode}>
                                    <h4>Edit</h4>
                                </Icon>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16} className="profileCard">
                                <Card>
                                    <Image src='https://scontent.ffcm1-1.fna.fbcdn.net/v/t31.0-8/134945_2036705478615_2093923519_o.jpg?_nc_cat=111&_nc_oc=AQkCEgvpbHbgdZEc62r_ldUG746jRostcMTFcGZwdfasat2FtV-AwD3QMG5Z15o7ttw&_nc_ht=scontent.ffcm1-1.fna&oh=8236b533cda69c32544d175eb180ba86&oe=5DE64BDB' wrapped ui={false} />
                                    <br />
                                    <Rating rating={this.props.customerRating.rating && this.props.customerRating.rating.substring(0,1)} maxRating={5} disabled size='large' />
                                    <h5>{this.props.customerRating.rating && this.props.customerRating.rating.substring(0,3)}</h5>
                                    <Card.Content>
                                        <Card.Header>{this.state.EditModeOn === false ?
                                            this.props.user.username
                                            :
                                            <Input
                                                value={this.state.username}
                                                onChange={this.handleChange('username')}
                                                size="mini"
                                                label="username" />
                                        }
                                        </Card.Header>
                                        <br />
                                        <Card.Meta>{this.state.EditModeOn === false ?
                                            this.props.user.email_address
                                            :
                                            <Input
                                                value={this.state.email_address}
                                                onChange={this.handleChange('email_address')}
                                                label="email" />
                                        }
                                        </Card.Meta>
                                        <br />
                                        <Card.Meta>{this.state.EditModeOn === false ?
                                            this.props.user.phone_number
                                            :
                                            <Input
                                                value={this.state.phone_number}
                                                onChange={this.handleChange('phone_number')}
                                                label="phone" />
                                        }
                                        </Card.Meta>
                                        <br />
                                        {this.state.EditModeOn === true ?
                                            <Card.Meta>
                                                <Button
                                                    size="big"
                                                    onClick={this.handleSubmit}
                                                    className="submitProfChanges">Submit Changes</Button>
                                            </Card.Meta>
                                            :
                                            <>
                                            </>
                                        }
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <br />
                            <Button
                                size="big"
                                inverted color="red"
                                className="deleteAccountButton"
                                onClick={this.toggleModal}>Delete Account
                            </Button>
                        </Grid.Row>

                    </Grid>
                    <Modal
                        open={this.state.modalOpen}
                        basic
                        size='small'>
                        <Header content='Are You Sure?' />
                        <Modal.Content>
                            <p>This Will PERMENANTLY Delete Your Account!</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={this.handleDeleteAcct}>
                                Delete Account
                            </Button>
                            <Button color='green' onClick={this.toggleModal}>
                                Go Back
                            </Button>
                        </Modal.Actions>


                    </Modal>
                    </Segment>
                </center>
            </>
        )
    }
}


const mapStateToProps = reduxState => ({
    user: reduxState.user,
    customerRating: reduxState.customerRating,
});
export default connect(mapStateToProps)(Profile);