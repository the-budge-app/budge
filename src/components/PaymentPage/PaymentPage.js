import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Checkbox, Button } from 'semantic-ui-react'
import { timingSafeEqual } from 'crypto';
const styles = {
    mainDiv: {
        textAlign: 'center',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    paymentDiv:{
        textAlign: 'left',
        marginLeft: '12%',
    },
    cvv:{
        float: 'right',
        maxWidth: '15%',
        marginRight: '12%',
    }
}
class PaymentPage extends Component {

    state={
        account_balance: '',
        
    }
    handleClick = () =>{
       
        
    }

    onChange =(event) =>{
        this.setState({
          newAirline: event.target.value
        })
      }

    handleChange = (event) => {
        this.setState({
            account_balance: event.target.value
        });
    }


    render() {
        return (
            <div style={styles.mainDiv} >

             
                <h1>Payments</h1>

                {/* <h4>Select Payment</h4><Checkbox toggle></Checkbox> */}
                <h4>Add Payment</h4>
                <pre>{JSON.stringify(this.state)}</pre>
                <input onChange={this.handleChange} value={this.state.account_balance} type="text" placeholder="Amount to Add"></input>
                <div style={styles.paymentDiv}>
                <br/>
                <br/>
                <input type="radio" class="hidden" readonly="" tabindex="0" />
                <label>MC ************ 5543</label>
                <input style={styles.cvv} type="text" placeholder="CVV"></input>
                <br/>
                <br/>
                <input type="radio" class="hidden" readonly="" tabindex="0" />
                <label>Visa ************ 3254</label>
                <input style={styles.cvv} type="text"  placeholder="CVV"></input>
                <br/>
                <br/>
                <input type="radio" class="hidden" readonly="" tabindex="0" />
                <label>Amex *********** 1001</label>
                <input style={styles.cvv} type="text" placeholder="CVV"></input>

                </div>
                <br/>
                <br/>
                <Button onClick={this.handleClick}>Submit Payment</Button>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(PaymentPage);

