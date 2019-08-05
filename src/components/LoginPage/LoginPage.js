import React, { Component } from 'react';
import { connect } from 'react-redux';


// import Semantic UI components
import { Grid, Input, Button } from 'semantic-ui-react'


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      if (this.props.closeLoginModal) {
        this.props.closeLoginModal();
      }
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div id="loginPage">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <Grid centered style={{ marginTop: '10vh' }}>
          <Grid.Row>
            <Grid.Column width={12} textAlign="center" >
              <h1>Login</h1>
            </Grid.Column>
            {!this.props.closeLoginModal &&
              <>
                <Grid.Column width={14} textAlign="center">
                  <br />
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                  >
                    Create an Account
                  </button>
                </Grid.Column>
              </>
            }
          </Grid.Row>
          <Grid.Column width={14}>
            <Input onChange={this.handleInputChangeFor('username')} label='Username' />
          </Grid.Column>

          <Grid.Column width={14}>
            <Input type="password" onChange={this.handleInputChangeFor('password')} label='Password' />
          </Grid.Column>

          <Grid.Column width={14} textAlign="center">
            <Button primary size="large" onClick={this.login} type='submit' name='submit'>Log In</Button>
          </Grid.Column>



        </Grid>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({errors});
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);