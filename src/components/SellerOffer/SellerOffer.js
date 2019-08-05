import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';

//semantic ui
import { Grid, Button, Icon, Rating, Segment } from 'semantic-ui-react'

const styles = {
  icon: {
    fontSize: '15vw',
    marginBottom: '10px',
    marginTop: '10px',
  },
  gridRow: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  partyData: {
    margin: '0',
  }
}

class SellerOffer extends Component {
  //temporary hold the user rating to be replaced with the saga calculation
  state = {
    offerId: queryString.parse(this.props.location.search).offerId,
    buyerId: queryString.parse(this.props.location.search).buyer,
    venueId: queryString.parse(this.props.location.search).venue,
    waitlistId: queryString.parse(this.props.location.search).waitlist,
  }

  handleAccept = () => {
    console.log('in handleAccept, venue', this.state.venueId);
    axios.put('/api/offers/update', {
      offerId: this.state.offerId,
      statusCode: 4,
    })
    axios.put(`/api/waitlist/swap?buyerWaitlist=${this.props.buyerInfo.waitlist_id}&sellerWaitlist=${this.state.waitlistId}&buyer=${this.state.buyerId}`)
    .then(
      result => this.props.history.push(`/venue/${this.state.venueId}`)
    )
    .catch(error => console.log('error with handle accept', error))
  }

  handleReject = () => {
    console.log('in handleReject');
    axios.put('/api/offers/update', {
      offerId: this.state.offerId,
      statusCode: 2,
    });
    axios.put(`/api/waitlist/reject/${this.state.waitlistId}`)
      .then(
        result => this.props.history.push(`/venue/${this.state.venueId}`)

      )
  }

  componentDidMount () {
    //get restaurant info
    this.props.dispatch({
      type:'FETCH_SELECTED_VENUE',
      payload: this.state.venueId,
    })
    //buyer info
    this.props.dispatch({
      type: 'FETCH_BUYER_INFO',
      payload: {
        waitlist_id: this.state.waitlistId,
        offer_id: this.state.offerId,
        buyer_id: this.state.buyerId,
        venue_id: this.state.venueId,
       } 
    })
    //seller info
    this.props.dispatch({
      type: 'FETCH_SELLER_INFO',
      payload: {
        waitlist_id: this.state.waitlistId,
        offer_id: this.state.offerId,
       } 
    })

     //refresh every minute
     this.interval = setInterval(() => {
       this.props.dispatch({
        type: 'FETCH_BUYER_INFO',
        payload: {
          waitlist_id: this.state.waitlistId,
          offer_id: this.state.offerId,
          venue_id: this.state.venueId,
         } 
        });
        this.props.dispatch({
          type: 'FETCH_SELLER_INFO',
          payload: {
            waitlist_id: this.state.waitlistId,
            offer_id: this.state.offerId,
           } 
        })
     },60000)
  }

    componentWillUnmount() {
      clearInterval(this.interval);
  }
    
  
  render() {
    return (
      <>
        <Segment>
          <Grid id='spotData'>
            <Grid.Row style={styles.gridRow}>
              <Grid.Column width={6} textAlign="center">
                <Icon circular bordered name="user" color="grey" style={styles.icon} />
                <Rating rating={this.props.customerRating.rating && this.props.customerRating.rating.substring(0,1)} maxRating={5} disabled size='large' />
                <h5>{this.props.customerRating.rating && this.props.customerRating.rating.substring(0,3)}</h5>
              </Grid.Column>
              <Grid.Column width={10} style={{ paddingLeft: '0' }}>
                <Grid>
                  <Grid.Row style={styles.gridRow}>
                    <Grid.Column width={16}>
                      <h2>{this.props.buyerInfo.username}</h2>
                      <h3>is offering ${this.props.buyerInfo.offer_price} for your spot!</h3>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Grid id='spot-info'>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <h2>{this.props.selectedVenue.restaurant_name}</h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <h3>{this.props.sellerInfo.username}</h3>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon name="user" />
            </Grid.Column>
            <Grid.Column width={2}>
              <h3>{this.props.sellerInfo.party_size}</h3>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon name="clock" />
            </Grid.Column>
            <Grid.Column width={4}>
              <h3>{this.props.sellerInfo.latest_wait_time} min</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <h3>{this.props.buyerInfo.username}</h3>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon name="user" />
            </Grid.Column>
            <Grid.Column width={2}>
              <h3>{this.props.buyerInfo.party_size}</h3>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon name="clock" />
            </Grid.Column>
            <Grid.Column width={4}>
              <h3>{this.props.buyerInfo.latest_wait_time} min</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button onClick={this.handleReject} fluid style={{color: 'white', backgroundColor: 'red'}}>Reject</Button>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button onClick={this.handleAccept} fluid style={{backgroundColor: 'green', color: 'white'}}>Accept</Button>
            </Grid.Column>
            <Grid.Column width={2}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = reduxState => ({
  buyerInfo: reduxState.sellerConfirmation.buyerInfo,
  selectedVenue: reduxState.selectedVenue,
  sellerInfo: reduxState.sellerConfirmation.sellerInfo,
  customerRating: reduxState.customerRating,
});
export default connect(mapStateToProps)(SellerOffer);