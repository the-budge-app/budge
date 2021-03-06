import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Nav from '../Nav/Nav';
import HomeMap from '../HomeMap/HomeMap'
import Venue from '../Venue/Venue'
import LoadingPage from '../LoadingPage/LoadingPage'
import Contact from '../Contact/Contact';
import Activity from '../Activity/Activity';
import Admin from '../Admin/Admin';
import SellerConfirm from '../Confirmation/SellerConfirm';
import BuyerConfirm from '../Confirmation/BuyerConfirm';
import SellerOffer from '../SellerOffer/SellerOffer';
import PaymentPage from '../PaymentPage/PaymentPage';
import Profile from '../Profile/Profile';
import RateUser from '../RateUser/RateUser';
import WaitlistSpot from '../WaitlistSpot/WaitlistSpot';
import ErrorPage from '../ErrorPage/ErrorPage'
import JoinWaitlist from '../JoinWaitlist/JoinWaitlist'
import Login from '../LoginPage/LoginPage'

import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('App page mounted!');
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <div className="app">
          {/* only show the nav component on every route except the loading route */}
          <Route path="/" render={(routerProps) => (routerProps.location.pathname !== "/loading") && <Nav {...routerProps} />} />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/loading */}
            <Redirect exact from="/" to="/loading" />

            {/* loading page component */}
            <Route exact path="/loading" component={LoadingPage} />

            {/* route to test any semantic ui components on */}
            <Route exact path="/login" component={Login}/>

            {/* route for the map component  */}
            <Route exact path="/home" component={HomeMap} />

            <Route exact path="/contact" component={Contact} />
            <Route exact path="/venue/:id" component={Venue} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

            <ProtectedRoute exact path="/buyer-confirm" component={BuyerConfirm}/>
            <ProtectedRoute exact path="/seller-confirm/:venueId/:offerId/:buyerId" component={SellerConfirm}/>
            <ProtectedRoute exact path="/payment" component={PaymentPage}/>
            <ProtectedRoute exact path="/profile" component={Profile}/>
            <ProtectedRoute exact path="/rate-user/:venueId/:id" component={RateUser}/>
            <ProtectedRoute exact path="/waitlist-spot/:id" component={WaitlistSpot}/>
            <ProtectedRoute exact path="/seller-offer" component={SellerOffer}/>
            <ProtectedRoute exact path="/join-waitlist/:restaurant_id" component={JoinWaitlist}/>
            <ProtectedRoute exact path="/admin" component={Admin}/>
            <Route exact path="/activity/:id" component={Activity}/>
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route component={ErrorPage} />
          </Switch>
          {/* only show the footer component on every route except the loading route */}
          {/* <Route path="/" render={(routerProps) => (routerProps.location.pathname == "/venue") && <Footer {...routerProps} />} /> */}
        </div>
      </Router>
    )
  }
}

export default connect()(App);
