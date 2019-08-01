import React, { Component } from 'react';
import { connect } from 'react-redux';

//semantic ui
import { Grid, Button, Icon, Rating, Input, Segment } from 'semantic-ui-react'

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

  state = {
    buyer_name: 'Sally1984',
    offerPrice: 20,
    userRating: 4.5,
  }

  componentDidMount () {
    //get restaurant info
    this.props.dispatch({
      type:'FETCH_SELECTED_VENUE',
      payload: 1 //to be replaced with req.query
    })
    this.props.dispatch({
      type: 'FETCH_BUYER_INFO',
      payload: {
        waitlist_id: 1,
        offer_id: this.props.match.params.offer_id
       } //to be replaced with req.query
    })
    this.props.dispatch({
      type: 'FETCH_SELLER_INFO',
      payload: {
        waitlist_id: 1,
        offer_id: this.props.match.params.offer_id,
       } //to be replaced with req.query.waitlist_id
    })
  }
  render() {
    return (
      <>
        <Segment>
          <Grid id='spotData'>
            <Grid.Row style={styles.gridRow}>
              <Grid.Column width={6} textAlign="center">
                <Icon circular bordered name="user" color="grey" style={styles.icon} />
                <Rating defaultRating={this.state.userRating} maxRating={5} disabled size='large' />
                <h5>{this.state.userRating}</h5>
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
              <h3>{this.props.sellerInfo.quote_time} min</h3>
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
              <h3>{this.props.buyerInfo.quote_time} min</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button fluid style={{color: 'white', backgroundColor: 'red'}}>Reject</Button>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button fluid style={{backgroundColor: 'green', color: 'white'}}>Accept</Button>
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
});
export default connect(mapStateToProps)(SellerOffer);