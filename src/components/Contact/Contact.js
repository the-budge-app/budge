import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, Segment, TextArea, Modal, Header, Icon, Grid } from 'semantic-ui-react'

const styles = {
    mainDiv: {
        textAlign: 'center',
    },
    gridRow: {
        paddingTop: '8px',
        paddingBottom: '8px',
    }
}



class Contact extends Component {
    state = {
        newEntry: {
            first_name: '',
            last_name: '',
            email_address: '',
            phone_number: '',
            comments: ''
        },
        successModal: false,
    }



    handleChange = (propertyName) => event => {
        // console.log('event happended')
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                [propertyName]: event.target.value,
            }
        });
    }

    addEntry = event => {
        event.preventDefault()
        this.setState({
            ...this.state,
            successModal: true,
            newEntry: {
                first_name: '',
                last_name: '',
                email_address: '',
                phone_number: '',
                comments: ''
            }
        })
        this.props.dispatch({
            type: 'ADD_ENTRY',
            payload: { ...this.state.newEntry }
        })
    }

    autoFillForm = () => {
        this.setState({
            newEntry: {
                first_name: 'Kaeti',
                last_name: 'G',
                email_address: 'kaeti@icloud.com',
                phone_number: '555-867-5309',
                comments: 'Budge is awesome. I have enjoyed using it!',
            }
        })
    }

    render() {
        return (
            <div style={styles.mainDiv}>
                <Segment>
                    <h2 onClick={this.autoFillForm}>Contact Us at Budge!</h2>
                    <h4>Complete the form below</h4>
                </Segment>
                <Form>
                    <Grid centered>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={14}>
                                <Input fluid type="text" placeholder="First Name" value={this.state.newEntry.first_name} onChange={this.handleChange('first_name')} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={14}>
                                <Input fluid type="text" placeholder="Last Name" value={this.state.newEntry.last_name} onChange={this.handleChange('last_name')} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={14}>
                                <Input fluid type="text" placeholder="Email Address" value={this.state.newEntry.email_address} onChange={this.handleChange('email_address')} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={14}>
                                <Input fluid type="text" placeholder="Phone Number" value={this.state.newEntry.phone_number} onChange={this.handleChange('phone_number')} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={14}>
                                <TextArea value={this.state.newEntry.comments}
                                    onChange={this.handleChange('comments')}
                                    rows={5}
                                    placeholder="Tell us more"
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={styles.gridRow}>
                            <Grid.Column width={14}>
                                <Button onClick={this.addEntry} color="green" fluid>Submit</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>

                {/* Below is the dialog for successfully sending message */}
                <Modal
                    open={this.state.successModal}
                    basic
                    size='small'
                >
                    <Header icon='comments outline' content='Feedback sent' />
                    <Modal.Content>
                        <h3>Thanks for your comments! </h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => { this.setState({ ...this.state, successModal: false }); this.props.history.push('/home');} }inverted>
                            <Icon name='checkmark' />Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Contact);