import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
        maxWidth: '15%',
        marginRight: '2%',
    },
    paymentTab: {


    }
}

class SelectPaymentTab extends Component {

    state = {
        account_balance: '',

    }
    updateBalance = () => {
        console.log('state', this.state);
        console.log('redux State', this.props.reduxState.user.account_balance);

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

                <div>

                    <div style={styles.paymentTab}>
                        <Icon name="dollar sign" />
                        <input onChange={this.handleChange} value={this.state.account_balance} type="text" placeholder="Amount to Add"></input>
                        <div style={styles.paymentDiv}>
                            <br />
                            <br />
                            <input type="radio" className="hidden" tabIndex="0" />
                            <label>MC ************ 5543</label>
                            <Icon style={styles.cvv} name="credit card" />
                            <input style={styles.cvv} type="text" placeholder="CVV"></input>

                            <br />
                            <br />
                            <input type="radio" className="hidden" tabIndex="0" />
                            <label>Visa ************ 3254</label>
                            <Icon style={styles.cvv} name="credit card" />
                            <input style={styles.cvv} type="text" placeholder="CVV"></input>

                            <br />
                            <br />
                            <input type="radio" className="hidden" tabIndex="0" />
                            <label>Amex *********** 1001</label>
                            <Icon style={styles.cvv} name="credit card" />
                            <input style={styles.cvv} type="text" placeholder="CVV"></input>


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
                </div>
                
                <Link to={`/waitlist-spot/${this.props.reduxState.selectedSpot.id}`}><Button fluid style={{backgroundColor: 'green', color: 'white'}} onClick={this.updateBalance}>Add Funds to Account</Button></Link>




                </div>


        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
    
});
export default connect(mapStateToProps)(SelectPaymentTab);