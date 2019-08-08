import React, { Component } from 'react';
import './Footer.css'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class WaitlistFooter extends Component {

  goToActivity = () => {
    this.props.history.push(`/activity/${this.props.match.params.id}`)
  }

  render() {
    return (
      <footer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} textAlign="center" color="green">
              <div>
                <h1>Waitlist</h1>
              </div>
            </Grid.Column>
            <Grid.Column width={8} textAlign="center" color="grey">
              <div onClick={this.goToActivity}>
                <h1>Activity</h1>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </footer>
    )
  }
}

const mapStateToProps = reduxState => ({
  venueInfo: reduxState.venueInfo,
  selectedVenue: reduxState.selectedVenue,
  user: reduxState.user,
  userWaitlist: reduxState.userWaitlist,
});

export default withRouter(connect(mapStateToProps)(WaitlistFooter));