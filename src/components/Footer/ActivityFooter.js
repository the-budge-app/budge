import React, { Component } from 'react';
import './Footer.css'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const styles = {
  headingTwo: {
    fontWeight: '300',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  }
}

class ActivityFooter extends Component {
  goToWaitlist = () => {
    this.props.history.push(`/venue/${this.props.match.params.id}`)
  }
  render() {
    return (
      <footer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} textAlign="center" color="grey">
              <div onClick={this.goToWaitlist}>
                <h2 style={styles.headingTwo}>Waitlist</h2>
              </div>
            </Grid.Column>
            <Grid.Column width={8} textAlign="center" color="green">
              <div>
                <h2 style={styles.headingTwo}>Activity</h2>
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

export default withRouter(connect(mapStateToProps)(ActivityFooter));
