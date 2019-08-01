import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Rating, Grid, Icon, Button } from 'semantic-ui-react'


class RateUser extends Component {
  state = {}

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating }) 
  
        
    render() {
      return (
       
        
          <Grid>
            <Grid.Row>
              <Grid.Column width={16} verticalAlign="center">
                <h1>Please rate (username)</h1>
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
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} verticalAlign="center">
                <Button fluid size="big" color="green">
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        
      );
    }
  }
  const mapStateToProps = reduxState => ({
      reduxState
  });
  export default connect(mapStateToProps)(RateUser);