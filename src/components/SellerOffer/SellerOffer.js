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
  render() {
    return (
      <Segment>
        <Grid id="spotData">
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
                    <h2>{this.state.buyer_name}</h2>
                    <h3>is offering ${this.state.offerPrice} for your spot!</h3>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Segment>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});
export default connect(mapStateToProps)(SellerOffer);