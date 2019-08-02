import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Icon, Rating, Input, Segment, TextArea } from 'semantic-ui-react'

const styles={
    mainDiv:{
        textAlign: 'center',
    }
}



class Contact extends Component {
    state ={
        newEntry:{
        first_name: '',
        last_name: '',
        email_address: '',
        phone_number: '',
        comments: ''
        }
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
        this.props.dispatch({
            type: 'ADD_ENTRY',
            payload: { ...this.state.newEntry }
        })
    
    }

    render() {
        return (
            <div style={styles.mainDiv}>
                <Segment>
            <h2>Contact Us at Budge!</h2>
            <h4>Email: hello@budge.com</h4>
            <h4>Or we can reach out to you</h4>
            </Segment>
            <Segment>

                {/* <pre>{JSON.stringify(this.state)}, Null, 2</pre> */}
                <Input type="text" placeholder="First Name" onChange={this.handleChange} value={this.state.newEntry.first_name} onChange={this.handleChange('first_name')}></Input>
                <br/>
                <br/>
                <Input type="text" placeholder="Last Name" onChange={this.handleChange} value={this.state.newEntry.last_name} onChange={this.handleChange('last_name')}></Input>
                <br/>
                <br/>
                <Input type="text" placeholder="Email Address" onChange={this.handleChange}  value={this.state.newEntry.email_address} onChange={this.handleChange('email_address')}></Input>
                <br/>
                <br/>
                <Input type="text" placeholder="Phone Number" onChange={this.handleChange} value={this.state.newEntry.phone_number} onChange={this.handleChange('phone_number')}></Input>
                
                <br/>
                <br/>
                < br/>
                <TextArea value={this.state.newEntry.comments} onChange={this.handleChange} fluid 
                onChange={this.handleChange('comments')}
                rows={5}
                placeholder="Tell us more"></TextArea>
                <Button onClick={this.addEntry} style={{color: "white", backgroundColor: "green"}} fluid>Submit</Button>
               
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Contact);