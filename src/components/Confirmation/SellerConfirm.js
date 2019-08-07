import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Segment, Icon, Rating } from 'semantic-ui-react'

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

class SellerConfirm extends Component {
  state = {
    buyer_name: 'Sally1984',
    offerPrice: 20,
    userRating: 4.5,
  }
  render() {
    return (
      <>
        <Segment>
          <Grid id='spotData'>
            <Grid.Row>
              <Grid.Column width={6} textAlign="center">
                <Icon circular bordered name="user" color="grey" style={styles.icon} />
                <Rating rating={this.props.customerRating.rating && this.props.customerRating.rating.substring(0,1)} maxRating={5} disabled size='large' />
                <h5>{this.props.customerRating.rating && this.props.customerRating.rating.substring(0,3)}</h5>
              </Grid.Column>
              <Grid.Column width={10} style={{ paddingLeft: '0' }}>
                <Grid>
                  <Grid.Row style={styles.gridRow}>
                    <Grid.Column width={16}>
                      <h4>You just got Budged!</h4>
                      <br />
                      <h5>{this.props.buyerInfo.username} paid ${this.props.buyerInfo.offer_price} for your spot</h5>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h3>Your new spot on waitlist:</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <h4>Reservation Name: {this.props.buyerInfo.reservation_name}</h4>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <h4>Party Size: {this.props.buyerInfo.party_size}</h4>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <h4>Time to Wait: {this.props.buyerInfo.latest_wait_time} min</h4>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                <Button fluid style={{ backgroundColor: 'green', color: 'white', float: 'center' }}>
                  I'll Take My Money, Thanks!
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>

    )
  }
}

const mapStateToProps = reduxState => ({
  buyerInfo: reduxState.sellerConfirmation.buyerInfo,
  selectedVenue: reduxState.selectedVenue,
  sellerInfo: reduxState.sellerConfirmation.sellerInfo,
  customerRating: reduxState.customerRating,
}
);
export default connect(mapStateToProps)(SellerConfirm);