import { stack as Menu } from 'react-burger-menu';
import React from 'react';
import { connect } from 'react-redux';
import './Nav2.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Nav2 = (props) => (
  
    <div className="nav">
        <>
        <Menu>
        <a className="menu-item" href="#/map">
        <Icon name='map marker alternate' />  Map
        </a>
        <br />
        <a className="menu-item" href="#/profile">
        <Icon name='user' />  Profile
        </a>
        <br />
        <a className="menu-item" href="#/payments">
        <Icon name='dollar sign' />  Payments
        </a>
       <br />
       <br />
       <br />
       <br />
       <br />
       <a href="/" className="menu-item"><Link className="menu-item" to="/home" onClick={() => props.dispatch({ type: 'LOGOUT' })}>
      Log Out
      </Link></a>
        </Menu>
        <div className="nav-center">
            <h1>Budge</h1>
        </div>
        <div className="nav-right">
          <Link className="nav-link" to="/semantic-playground">
            Semantic
      </Link>
        </div>
        </>
      
      {/* Always show this link since the about page is not protected */}
    </div>
);

const mapStateToProps = state => ({
    user: state.user,
    loginMode: state.loginMode,
  });
  
  export default connect(mapStateToProps)(Nav2);