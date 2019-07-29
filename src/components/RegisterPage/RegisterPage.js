import React, { Component } from 'react';
import { connect } from 'react-redux';

//import Semantic UI Components 
import { Grid, Input, Button } from 'semantic-ui-react'

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div id="registerPage">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Grid centered style={{ marginTop: '10vh' }}>
          <Grid.Row>
            <Grid.Column width={12} textAlign="center" >
              <h1>Register</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={14}>
            <Input onChange={this.handleInputChangeFor('username')} label='Username' />
          </Grid.Column>

          <Grid.Column width={14}>
            <Input onChange={this.handleInputChangeFor('password')} label='Password' />
          </Grid.Column>

          <Grid.Column width={14}>
            <Input onChange={this.handleInputChangeFor('email')} label='Email' />
          </Grid.Column>

          <Grid.Column width={14}>
            <Input onChange={this.handleInputChangeFor('phone')} label='Phone' />
          </Grid.Column>

          <Grid.Column width={14} textAlign="center">
            <Button primary size="large" onClick={this.registerUser} type='submit' name='submit'>Register</Button>
          </Grid.Column>

          <Grid.Column width={14} textAlign="center">
            <button
              type="button"
              className="link-button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            >
              Login Form
          </button>
          </Grid.Column>

        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

