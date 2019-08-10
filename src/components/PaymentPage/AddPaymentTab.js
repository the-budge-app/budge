import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Input, Header, Modal, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const styles = {
    mainDiv: {
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

class AddPaymentTab extends Component {

    state = {
        name: '',
        number: '',
        expiration: '',
        cvv: '',
        zip: '',
        successModal: false
    }

    autofillPayment = () => {
        this.setState({
            name: 'Kaeti G',
            number: '1234567812345678',
            expiration: '02/25',
            cvv: '123',
            zip: '55415',
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state, [event.target.id]: event.target.value
        })
    }

    handleSubmit = () => {
        // add modal here for success
        this.setState({
            name: '',
            number: '',
            expiration: '',
            cvv: '',
            zip: '',
            successModal: true,
        })
    }

    render() {
        return (
            <div style={styles.mainDiv} id="addPayment">
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Input
                                value={this.state.name}
                                onChange={this.handleChange}
                                id="name"
                                fluid
                                label={{ basic: true, content: 'Name on Card', onClick: () => this.autofillPayment() }}
                                placeholder='Cardholder name'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Input
                                value={this.state.number}
                                onChange={this.handleChange}
                                id="number"
                                fluid
                                label={{ basic: true, content: 'Card Number' }}
                                placeholder='Card Number'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Input
                                value={this.state.expiration}
                                onChange={this.handleChange}
                                id="expiration"
                                fluid
                                label={{ basic: true, content: 'Exp Date' }}
                                placeholder='Exp Date(mm/yy)'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Input
                                value={this.state.cvv}
                                onChange={this.handleChange}
                                id="cvv"
                                fluid
                                label={{ basic: true, content: 'CVV' }}
                                placeholder='CVV'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Input
                                value={this.state.zip}
                                onChange={this.handleChange}
                                id="zip"
                                fluid
                                label={{ basic: true, content: 'Zip Code' }}
                                placeholder='Zip Code'
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid centered>
                    <Grid.Column width={12}>
                        <Button onClick={this.handleSubmit} fluid color="green">Add Payment Method</Button>
                    </Grid.Column>
                </Grid>

                {/* Below is the dialog successful payment addition */}
                <Modal
                    open={this.state.successModal}
                    basic
                    size='small'
                >
                    <Header icon='check circle outline' content='Payment method added!' />
                    <Modal.Content>
                        <h3>Payment Method Successfully Added.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Link to="/home">
                            <Button color='green' onClick={() => this.setState({ ...this.state, successModal: false })} inverted>
                                <Icon name='checkmark' />Ok
                            </Button>
                        </Link>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(AddPaymentTab);