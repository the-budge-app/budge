import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import { Sidebar, Menu, Icon, Grid, Modal } from 'semantic-ui-react';

import Login from '../LoginPage/LoginPage'
import Register from '../RegisterPage/RegisterPage'

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
    menuLinks: [
      {
        name: 'Home',
        to: '/home',
        onClick: () => this.setState({ ...this.state, visible: !this.state.visible }),
        icon: 'map marker alternate',
      },
      {
        name: 'Profile',
        to: '/profile',
        onClick: () => this.setState({ ...this.state, visible: !this.state.visible }),
        icon: 'user',
      },
      {
        name: 'Payments',
        to: '/payment',
        onClick: () => this.setState({ ...this.state, visible: !this.state.visible }),
        icon: 'dollar sign',
      },
      {
        name: 'Contact',
        to: '/contact',
        onClick: () => this.setState({ ...this.state, visible: !this.state.visible }),
        icon: 'mail outline',
      },
      {
        name: 'Log Out',
        to: '/loading',
        onClick: () => {
          this.setState({ ...this.state, visible: !this.state.visible });
          this.props.dispatch({ type: 'LOGOUT' });
        },
        icon: 'log out'
      },
    ]
  }

  render() {
    return (
      <>
        <Grid className="nav">
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={3}>
              <Icon name='bars' size='big' className='menuIcon' onClick={() => this.setState({ ...this.state, visible: !this.state.visible })} />
            </Grid.Column>
            <Grid.Column width={10} textAlign="center">
              <h2 style={styles.logo}>Budge</h2>
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              {this.props.user.id ?
                <>
                {/* show a quick link back to the map for easy navigation on ever page except home */}
                {
                  this.props.location.pathname !== '/home' && 
                  <Link to='/home'>
                    <Icon name="map outline" size="large" inverted/>
                  </Link>
                }
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
            { 
              this.props.user.id &&
              <>
                <Link to='/payment'>
                  <h3 style={styles.accountBalance}>Account Balance:</h3>
                  <h3 style={styles.accountBalance}>${this.props.user.account_balance}</h3>
                </Link>
              </>
            }
            <Icon style={styles.closeIcon} inverted size="large" onClick={() => this.setState({ ...this.state, visible: !this.state.visible })} name='close' />
          </Menu.Item>
          {/* map through the array of menu items */}
          {this.state.menuLinks.map((link, index) => {
            return (
              <Menu.Item style={{ textAlign: 'left' }} key={index}>
                <Link onClick={link.onClick} to={link.to}>
                  <Icon name={link.icon} />
                  {link.name}
                </Link>
              </Menu.Item>
            )
          })}
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
            {this.props.loginMode === 'login' ?
              <Login closeLoginModal={() => this.setState({ ...this.state, loginModal: false, })} />
              :
              <Register closeLoginModal={() => this.setState({ ...this.state, loginModal: false, })} />
            }
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
  loginMode: state.loginMode,
});

export default connect(mapStateToProps)(Nav);
