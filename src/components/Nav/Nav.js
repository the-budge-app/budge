import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import { Sidebar, Menu, Icon, Grid, Modal, Header } from 'semantic-ui-react';

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
    loggingIn: false,
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
    ]
  }


  logout = () => {
    this.setState({ ...this.state, visible: !this.state.visible });
    this.props.dispatch({ type: 'LOGOUT' });
  }

  closeLoginRegisterModal = () => {
    this.setState({
      ...this.state, loggingIn: true,
    })
    setTimeout(() => {
      this.setState({
        ...this.state, loggingIn: false, loginModal: false,
      })
    }, 1500)
  }

  render() {
    return (
      <>
        <Grid className="nav">
          <Grid.Row verticalAlign='middle' style={{ padding: '0' }}>
            <Grid.Column width={3}>
              <Icon name='bars' size='big' className='menuIcon' onClick={() => this.setState({ ...this.state, visible: !this.state.visible })} />
            </Grid.Column>
            <Grid.Column width={10} textAlign="center">
              <h2 style={styles.logo} onClick={() => this.history.push('/home')}>Budge</h2>
            </Grid.Column>
            <Grid.Column width={3} textAlign="right">
              {this.props.user.id ?
                <>
                  {/* show a quick link back to the map for easy navigation on ever page except home */}
                  {
                    this.props.location.pathname !== '/home' &&
                    <Link to='/home'>
                      <Icon name="map outline" size="large" inverted />
                    </Link>
                  }
                </>
                :
                <h4 style={{ color: 'white' }} onClick={() => this.setState({ ...this.state, loginModal: true })}>Login</h4>
              }
            </Grid.Column>
          </Grid.Row>
          {this.props.user.id &&
            <Grid.Row centered style={{ padding: '0', backgroundColor: 'white' }}>
              <Grid.Column width={16}>
                <p style={{ textTransform: 'capitalize', paddingTop: '5px', fontSize: '16px' }}>
                  Hi, {this.props.user.username}
                </p>
              </Grid.Column>
            </Grid.Row>
          }
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
          <Menu.Item style={{ textAlign: 'left', minHeight: '40px' }}>
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
          <Menu.Item style={{ textAlign: 'left' }}>
            {this.props.user.id ?
              <Link onClick={this.logout} to='/loading'>
                <Icon name='sign-out' />
                Log Out
              </Link>
              :
              <Link to={this.props.history.location.pathname} onClick={() => { this.setState({ ...this.state, loginModal: true, visible: !this.state.visible }) }}>
                <Icon name='sign-in' />
                Login
              </Link>
            }
          </Menu.Item>
          {this.props.user.admin &&
            <Menu.Item style={{ textAlign: 'left' }}>
              <Link to='/admin'>
                <Icon name='user secret' />
                Admin
              </Link>
            </Menu.Item>
          }


        </Sidebar>

        {/* Modal for login */}
        <Modal
          open={this.state.loginModal}
          onClose={() => this.setState({ ...this.state, loginModal: false, })}
          basic
          size='small'
        >
          {this.props.loginMode === 'login' ?
            <>
              {!this.state.loggingIn &&
                <>
                  <Modal.Actions>
                    <Icon name='close' onClick={() => this.setState({ ...this.state, loginModal: false, })} />
                  </Modal.Actions>
                  <Header style={{ textAlign: 'center' }} content='Please Log In' />
                </>
              }
            </>
            :
            <>
              <Modal.Actions>
                <Icon name='close' onClick={() => this.setState({ ...this.state, loginModal: false, })} />
              </Modal.Actions>
              <Header style={{ textAlign: 'center' }} content='Register' />
            </>
          }
          <Modal.Content>
            {this.state.loggingIn ?
              <>
                <Grid centered>
                  <Grid.Column width={12} textAlign="center">
                    <h2>Logging in...</h2>
                  </Grid.Column>
                  <Grid.Column width={12} textAlign="center">
                    <Icon name="spinner" size="huge" loading={this.state.loggingIn} />
                  </Grid.Column>
                </Grid>
              </>
              :
              <>
                {this.props.loginMode === 'login' ?
                  <Login closeLoginModal={this.closeLoginRegisterModal} />
                  :
                  <Register closeLoginModal={this.closeLoginRegisterModal} />
                }
              </>
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
