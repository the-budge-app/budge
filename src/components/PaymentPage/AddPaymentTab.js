import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'semantic-ui-react'

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

class AddPaymentTab extends Component {


    render() {
        return (
            <div style={styles.mainDiv} >
                <br/>
            
            <br/>
                <label>Name on Credit Card</label>
                <br/>
            <Input type='text' placeholder='John M Smith'></Input>
            <br/>
            <br/>
            <label>Card Number</label>
                <br/>
            <Input type='text' placeholder='xxxx-xxxx-xxxx-0000'></Input>
            <br/>
            <br/>
            <label>Expiration Date</label>
                <br/>
            <Input type='text' placeholder='01/01/2023'></Input>
            <br/>
            <br/>
            <label>CVV CODE</label>
                <br/>
            <Input type='text' placeholder='123' ></Input>
            <br/>
            <br/>
            <label>Billing Zip Code</label>
                <br/>
            <Input type='text' placeholder='55415'></Input>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button fluid style={{backgroundColor: 'green', color: 'white'}}>Add Payment Method</Button>

    


            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(AddPaymentTab);