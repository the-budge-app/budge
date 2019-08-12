import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Feed, Icon, Grid } from 'semantic-ui-react';
import ActivityFooter from '../Footer/ActivityFooter';

class Activity extends Component {

    state = {
        budges: [
            {
                id: 1,
                budger: 'Michael',
                budgee: 'Jeff',
                action: 'budged',
                price: 8,
                time: 27,
                wows: 4,
            },
            {
                id: 3,
                budger: 'Kaeti',
                budgee: 'Michael',
                action: 'budged',
                price: 18,
                time: 14,
                wows: 2,
            },
            {
                id: 2,
                budger: 'Weizhen',
                budgee: null,
                action: 'joined the waitlist!',
                price: null,
                time: 67,
                wows: 4,
            },
            {
                id: 4,
                budger: 'Weizhen',
                budgee: 'Jeff',
                action: 'rejected',
                price: 15,
                time: 42,
                wows: 2,
            },
            {
                id: 2,
                budger: 'Kyle',
                budgee: null,
                action: 'joined the waitlist!',
                price: null,
                time: 67,
                wows: 4,
            },
            {
                id: 3,
                budger: 'Kyle',
                budgee: 'Weizhen',
                action: 'budged',
                price: 20,
                time: 14,
                wows: 2,
            },
            
        ]
    }

    render() {
        return (
            <>
                <Grid style={{paddingBottom: '65px'}}>
                    {this.state.budges.map(budge => {
                        return (
                            <Grid.Row key={budge.id}>
                                <Grid.Column>
                                    <Feed>
                                        <Feed.Event>
                                            <Feed.Content>
                                                <Feed.Summary>
                                                    <Icon name="user circle" size="large" />
                                                    <Feed.User>{budge.budger}</Feed.User>
                                                    <span> {budge.action}</span>
                                                    {
                                                        budge.budgee &&
                                                        <>
                                                            <Icon name="user circle" size="large" />
                                                            <Feed.User>{budge.budgee}</Feed.User> for ${budge.price}
                                                        </>
                                                    }
                                                </Feed.Summary>
                                                <Feed.Meta>
                                                    <Feed.Date style={{marginLeft: '9px', marginTop: '-2px'}}>{budge.time} Minutes Ago</Feed.Date>
                                                    <Feed.Like>
                                                        <Icon name='like' />
                                                        {budge.wows} Wows
                                                    </Feed.Like>
                                                </Feed.Meta>
                                            </Feed.Content>
                                        </Feed.Event>
                                    </Feed>
                                </Grid.Column>
                            </Grid.Row>
                        )
                    })}
                </Grid>
                <ActivityFooter />
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    // venueInfo: reduxState.venueInfo,
});

export default connect(mapStateToProps)(Activity);