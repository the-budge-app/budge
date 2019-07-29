import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'


import UserPage from '../UserPage/UserPage';

import HomeMap from '../HomeMap/HomeMap'
import Venue from '../Venue/Venue'
import LoadingPage from '../LoadingPage/LoadingPage'
import StatusPage from '../StatusPage/StatusPage'
import Contact from '../Contact/Contact';
import SemanticPlayground from '../SemanticPlayground'

import './App.css';
import SellerConfirm from '../Confirmation/SellerConfirm';
import BuyerConfirm from '../Confirmation/BuyerConfirm';
import SellerOffer from '../SellerOffer/SellerOffer';
import PaymentPage from '../PaymentPage/PaymentPage';
import Profile from '../Profile/Profile';
import RateUser from '../RateUser/RateUser';
import SelectedOffer from '../SelectedOffer/SelectedOffer';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          {/* only show the nav component on every route except the loading route */}
          <Route path="/" render={(routerProps) => (routerProps.location.pathname !== "/loading") && <Nav {...routerProps} />} />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/loading */}
            <Redirect exact from="/" to="/loading" />

            {/* loading page component */}
            <Route exact path="/loading" component={LoadingPage} />

            {/* route to test any semantic ui components on */}
            <Route exact path="/semantic-playground" component={SemanticPlayground} />

            {/* route for the map component  */}
            <Route exact path="/home" component={HomeMap} />

            <Route exact path="/contact" component={Contact} />
            <Route exact path="/venue" component={Venue} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />

            <ProtectedRoute exact path="/status" component={StatusPage}/>
            <ProtectedRoute exact path="/buyer-confirm" component={BuyerConfirm}/>
            <ProtectedRoute exact path="/seller-confirm" component={SellerConfirm}/>
            <ProtectedRoute exact path="/payment" component={PaymentPage}/>
            <ProtectedRoute exact path="/profile" component={Profile}/>
            <ProtectedRoute exact path="/rate-user" component={RateUser}/>
            <ProtectedRoute exact path="/selected-offer" component={SelectedOffer}/>
            <ProtectedRoute exact path="/seller-offer" component={SellerOffer}/>
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* only show the footer component on every route except the loading route */}
          <Route path="/" render={(routerProps) => (routerProps.location.pathname !== "/loading") && <Footer {...routerProps} />} />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
