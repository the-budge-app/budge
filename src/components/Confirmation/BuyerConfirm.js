import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    textRow:{
        textAlign: 'right',
    },
    partyData: {
      margin: '0',
    }
  }
class BuyerConfirm extends Component {

    state= {
        seller_name: 'Steverino',
        offerPrice: 45,
        userRating: 4.5,
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
              <Grid.Column width={9} style={{ paddingLeft: '0' }}>
                <Grid>
                  <Grid.Row style={styles.gridRow}>
                    <Grid.Column width={16}>
                      <h4>{this.state.seller_name} Accepted your offer!</h4>
                      <br/>
                      <h4>${this.state.offerPrice} has been removed from your account</h4>
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
                        <h4>Reservation Name:</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <h4>Party Size:</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <h4>Time to Wait:</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column width={12}> 
                    <Button fluid style={{backgroundColor: 'green', color: 'white', float: 'center'}}>
                        You are a Budger!
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
    reduxState
});
export default connect(mapStateToProps)(BuyerConfirm);