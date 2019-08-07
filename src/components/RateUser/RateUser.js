import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rating, Grid, Icon, Button, Modal, Header } from 'semantic-ui-react'


class RateUser extends Component {
  state = {
    modalOpen: false,
    rating: 0,
    user_id: this.props.match.params.id
  }
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_USER_TO_RATE', payload: this.props.match.params.id })
  }
  handleRate = (e, { rating }) => this.setState({ rating })

  handleSubmit = () => {
    this.props.dispatch({ type: 'POST_RATING', payload: this.state })
    console.log('susie gave you a', this.state.rating)
  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen,
    })
  }

  handleSkip = () => {
    console.log('user skipped rating')
    this.props.history.push('/home')
  }

  render() {
    return (

      <>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} verticalAlign="center">
              <h1>Please rate {this.props.customerRating[0]}</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} verticalAlign="center">
              <Icon name="user circle" size="massive" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} verticalAlign="center">
              <Rating size="massive" maxRating={5} onRate={this.handleRate} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} verticalAlign="center">
              <Button fluid size="big" color="green" onClick={this.handleSubmit}>
                Submit
                </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} verticalAlign="center">
              <Button fluid size="big" invertedcolor="grey" onClick={this.toggleModal}>
                Skip It
            </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal
          open={this.state.modalOpen}
          basic
          size='small'>
          <Header content='Are You Sure?' />
          <Modal.Content>
            <p>Rating your experience will help other users Budge responsibly.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='grey' onClick={this.handleSkip}>
              No, Thanks
          </Button>
            <Button color='green' onClick={this.toggleModal}>
              Okay, I'll rate.
          </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}
const mapStateToProps = reduxState => ({
  user: reduxState.user,
  selectedVenue: reduxState.selectedVenue,
  selectedSpot: reduxState.selectedSpot,
  userWaitlist: reduxState.userWaitlist,
  buyerInfo: reduxState.buyerInfo,
  customerRating: reduxState.customerRating,

});
export default connect(mapStateToProps)(RateUser);