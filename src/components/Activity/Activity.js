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
                                            <Feed.User>{this.props.user.username}</Feed.User> budged
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>Waluigi</Feed.User> for $8
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
                                            <Feed.User>MrBubz</Feed.User> budged
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>PrincessPetch</Feed.User> for $15
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
                                            <Feed.User>ItIsWednesday</Feed.User> budged
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>MyDudes</Feed.User> for $18
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
                                            <Feed.User>Butter</Feed.User> budged 
                                            <Icon name="user circle" size="large" />
                                            <Feed.User>PaulaDeen</Feed.User> for $2
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
});

export default connect(mapStateToProps)(Activity);