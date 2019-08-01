import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import SelectPaymentTab from './SelectPaymentTab'
import AddPaymentTab from './AddPaymentTab'

const panes = [
    { menuItem: 'Select Payment', render: () => <Tab.Pane> <SelectPaymentTab />  </Tab.Pane> },
    { menuItem: 'Add Payment Method', render: () => <Tab.Pane> <AddPaymentTab/></Tab.Pane> },
  ]

class PaymentPage extends Component {



    render() {
        return (
            <div  >
                <Tab panes={panes} />
            


            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(PaymentPage);

