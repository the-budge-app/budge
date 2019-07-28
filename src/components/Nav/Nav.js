import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Sidebar, Menu, Icon, Button } from 'semantic-ui-react';

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
      <div className="nav">
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible={this.state.visible}
          width='thin'
        >
          <Menu.Item as='a'>
          <Button primary onClick={this.toggleVisible}>Close</Button>
            </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='map marker alternate' />
            Map
            </Menu.Item>
            <Menu.Item as='a'>
            <Icon name='user' />
            Profile
            </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='dollar sign' />
            Payment
            </Menu.Item>
        </Sidebar>
        <Icon name='list' primary onClick={this.toggleVisible}/>
        <div className="nav-right">
          <Link className="nav-link" to="/semantic-playground">
            Semantic
      </Link>
        </div>
      </div>
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
