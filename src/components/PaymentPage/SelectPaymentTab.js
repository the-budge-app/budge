import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Input, Grid } from 'semantic-ui-react';
import { Link, } from 'react-router-dom';

const styles = {
    mainDiv: {

        textAlign: 'center',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    paymentDiv: {
        textAlign: 'left',
        marginLeft: '12%',
    },
    cvv: {
        float: 'right',
        maxWidth: '30%',
        marginRight: '2%',
    }
}

class SelectPaymentTab extends Component {

    state = {
        account_balance: '',

    }
    updateBalance = () => {
        console.log('state', this.state);
        console.log('redux State', this.props.reduxState.user.account_balance);
        if (this.props.toggleModal) {
            this.props.toggleModal();
        }

        this.props.dispatch({
            type: 'ADD_FUNDS',
            payload: {
                account_balance: Number(this.state.account_balance) + (this.props.reduxState.user.account_balance),
                id: this.props.reduxState.user.id,
                history: this.props.history,
                waitlistId: this.props.reduxState.selectedSpot.id,
            }
        })
        //this.props.history.push('/home')

    }

    handleChange = (event) => {
        this.setState({
            account_balance: event.target.value
        });
    }


    render() {
        return (
            <div style={styles.mainDiv} >

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Input icon="dollar sign" iconPosition="left" onChange={this.handleChange} value={this.state.account_balance} type="text" placeholder="Amount to Add"></Input>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type="radio" className="hidden" tabIndex="0" />
                            <label>MC ************ 5543</label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type="radio" className="hidden" tabIndex="0" />
                            <label>Visa ************ 3254</label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input type="radio" className="hidden" tabIndex="0" />
                            <label>Amex *********** 1001</label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{marginTop: '25px'}}>
                        <Grid.Column>
                            <Link to={`/waitlist-spot/${this.props.reduxState.selectedSpot.id}`}><Button fluid style={{ backgroundColor: 'green', color: 'white' }} onClick={this.updateBalance}>Add Funds to Account</Button></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {/* <div>

                    <div>
                        <Icon name="dollar sign" />
                        <Input onChange={this.handleChange} value={this.state.account_balance} type="text" placeholder="Amount to Add"></Input>
                        <div style={styles.paymentDiv}>

                            <br />
                            <br />
                            <br />
                            <Input type="radio" className="hidden" tabIndex="0" />
                            <label>MC ************ 5543</label>
                            <Input style={styles.cvv} type="text" icon="credit card" placeholder="CVV"></Input>

                            <br />
                            <br />
                            <br />
                            <Input type="radio" className="hidden" tabIndex="0" />
                            <label>Visa ************ 3254</label>
                            <Input style={styles.cvv} type="text" icon="credit card" placeholder="CVV"></Input>

                            <br />
                            <br />
                            <br />
                            <Input type="radio" className="hidden" tabIndex="0" />
                            <label>Amex *********** 1001</label>
                            <Input style={styles.cvv} type="text" icon="credit card" placeholder="CVV"></Input>


                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,

});
export default connect(mapStateToProps)(SelectPaymentTab);