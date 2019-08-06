import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Feed, Icon, Grid } from 'semantic-ui-react';
import ActivityFooter from '../Footer/ActivityFooter';

class Activity extends Component {
    render() {
        return (
            <>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>JosephJoestar</Feed.User> budged
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>Dio</Feed.User> for $8
                                            <Feed.Date>1 Hour Ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />
                                                4 Wows
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>SuzyQ</Feed.User> budged joined the waitlist!
                                            <Feed.Date>20 Minutes Ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />
                                                7 Wows
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>OwenWowlson</Feed.User> budged
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>JosephJoestar</Feed.User> for $18
                                            <Feed.Date>16 Minutes Ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />
                                                2 Wows
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>Dio</Feed.User> budged 
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>JosephJoestar</Feed.User> for $60
                                            <Feed.Date>20 Minutes Ago</Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Meta>
                                            <Feed.Like>
                                                <Icon name='like' />
                                                7 Wows
                                            </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            <ActivityFooter/>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    // venueInfo: reduxState.venueInfo,
});

export default connect(mapStateToProps)(Activity);