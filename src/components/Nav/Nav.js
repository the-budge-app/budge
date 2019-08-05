import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import { Sidebar, Menu, Icon, Grid, Modal } from 'semantic-ui-react';

import Login from '../LoginPage/LoginPage'

const styles = {
  closeIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px',
  },
  logo: {
    fontSize: '2.5rem',
  },
  accountBalance: {
    color: 'white',
    margin: '5px',
    fontWeight: '300',
    letterSpacing: '1px',
  }
}

class Nav extends Component {
  state = {
    visible: false,
    loginModal: false,
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }


  render() {
    return (
      <>
        <Grid className="nav">
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={3}>
              <Icon name='bars' size='big' className='menuIcon' onClick={this.toggleVisible} />
            </Grid.Column>
            <Grid.Column width={10} textAlign="center">
              <h2 style={styles.logo}>Budge</h2>
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              {this.props.user.id ?
                <>
                </>
                :
                <h4 style={{ color: 'white' }} onClick={() => this.setState({ ...this.state, loginModal: true })}>Login</h4>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible={this.state.visible}
          width='thin'
        >
          <Menu.Item style={{ textAlign: 'left' }}>
            <Link to='/payment'>
              <h3 style={styles.accountBalance}>Account Balance:</h3>
              <h3 style={styles.accountBalance}>${this.props.user.account_balance}</h3>
            </Link>
            <Icon style={styles.closeIcon} inverted size="large" onClick={this.toggleVisible} name='close' />
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'left' }}>
            <Link onClick={this.toggleVisible} to='/home'>
              <Icon name='map marker alternate' />
              Home/Map
            </Link>
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'left' }}>
            <Link onClick={this.toggleVisible} to='/profile'>
              <Icon name='user' />
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'left' }}>
            <Link onClick={this.toggleVisible} to='/payment'>
              <Icon name='dollar sign' />
              Payments
            </Link>
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'left' }}>
            <Link onClick={this.toggleVisible} to="/contact">
              <Icon name='mail outline' />
              Contact
            </Link>
          </Menu.Item>
          <Menu.Item style={{ textAlign: 'left' }}>
            <Link to="/loading" onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
              <Icon onClick={this.toggleVisible} name='log out' />
              Log Out
            </Link>
          </Menu.Item>
        </Sidebar>
        {/* Modal for login */}
        <Modal
          open={this.state.loginModal}
          onClose={() => this.setState({ ...this.state, loginModal: false, })}
          basic
          size='small'
        >
          <Modal.Actions>
            <Icon name='close' onClick={() => this.setState({ ...this.state, loginModal: false, })} />
          </Modal.Actions>
          <Modal.Content>
            <Login closeLoginModal={() => this.setState({ ...this.state, loginModal: false, })} />
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
