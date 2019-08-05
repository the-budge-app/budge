import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import { Sidebar, Menu, Icon, Grid } from 'semantic-ui-react';

const styles = {
  closeIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px',
  }
}

class Nav extends Component {
  state = {
    visible: false,
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
            <Grid.Column width={2}>
              <Icon name='bars' size='big' className='menuIcon' onClick={this.toggleVisible} />
            </Grid.Column>
            <Grid.Column width={10} textAlign="center">
              <div id="logoWrapper">
                <h2>Budge</h2>
              </div>
            </Grid.Column>
            <Grid.Column width={2} textAlign="right">
              <div>
                <Link to='/payment'>
                <h2>${this.props.user.account_balance}</h2>
                </Link>
              </div>
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
          <Menu.Item style={{ height: '44px'}}>
            <Icon style={styles.closeIcon} inverted size="large" onClick={this.toggleVisible} name='close' />
          </Menu.Item>
          <Menu.Item style={{textAlign: 'left'}}>
            <Link onClick={this.toggleVisible} to='/home'>
            <Icon name='map marker alternate' />
              Home/Map
            </Link>
          </Menu.Item>
          <Menu.Item style={{textAlign: 'left'}}>
            <Link onClick={this.toggleVisible} to='/profile'>
            <Icon name='user' />  
            Profile
            </Link>
          </Menu.Item>
          <Menu.Item style={{textAlign: 'left'}}>
            <Link onClick={this.toggleVisible} to='/payment'>
            <Icon name='dollar sign' />  
            Payments
            </Link>
          </Menu.Item>
          <Menu.Item style={{textAlign: 'left'}}>
            <Link onClick={this.toggleVisible} to="/contact">
              <Icon name='mail outline' />
              Contact
            </Link>
          </Menu.Item>
          <Menu.Item style={{textAlign: 'left'}}>
            <Link to="/loading" onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
              <Icon onClick={this.toggleVisible} name='log out' />
              Log Out
            </Link>
          </Menu.Item>
        </Sidebar>
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
