import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button } from 'semantic-ui-react';
import './JoinWaitlist.css';

class JoinWaitlist extends Component {
  state = {
    user_id: this.props.user.id,
    reservation_name: '',
    party_size: 1,
    quote_time: '',
    id: this.props.selectedVenue.id
  }

  handleChange = (reservationAttribute) => (event) => {
    this.setState({
      ...this.state,
      [reservationAttribute]: event.target.value,

    });
  }

  handleJoin = () => {
    this.props.dispatch({ type: 'ADD_TO_WAITLIST', payload: this.state })
    this.props.history.push('/venue/' + this.props.selectedVenue.id)
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <h1>{this.props.selectedVenue.restaurant_name}</h1>
              <h4>{this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(0, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(3, 3)} - {this.props.selectedVenue.phone_number && this.props.selectedVenue.phone_number.substr(6, 4)} </h4>
              <h4>{this.props.selectedVenue.address}</h4>
              <h4>{this.props.selectedVenue.city} {this.props.selectedVenue.state}, {this.props.selectedVenue.zip}</h4>
              <br/>
              <h3>{this.props.user.username}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="left">
              <Input
                fluid
                value={this.state.reservation_name}
                onChange={this.handleChange('reservation_name')}
                size="small"
                label="Reservation Name" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="left">
              <Input
                fluid
                value={this.state.party_size}
                onChange={this.handleChange('party_size')}
                size="small"
                label="Party Size"
                type="number" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="left">
              <Input
                fluid
                value={this.state.quote_time}
                onChange={this.handleChange('quote_time')}
                size="small"
                label="Quoted Time"
                type="number" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} textAlign="left">
              <Button 
              className="joinButton" 
              fluid
              color="green" 
              onClick={this.handleJoin}>Join Waitlist</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = reduxState => ({
  venueInfo: reduxState.venueInfo,
  selectedVenue: reduxState.selectedVenue,
  user: reduxState.user,
});
export default connect(mapStateToProps)(JoinWaitlist);