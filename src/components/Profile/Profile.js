import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Input, Button, Icon, Grid } from 'semantic-ui-react';
import './Profile.css';

class Profile extends Component {
    state = {
        EditModeOn: true
    }

    toggleEditMode = () => {
        this.setState({
            EditModeOn: !this.state.EditModeOn
        })
    }

    render() {
        return (
            <>
                <Grid className="profile">
                    <Grid.Row>
                        <Grid.Column>
                            <Icon
                                id="editMode"
                                name="cog"
                                size="big"
                                onClick={this.toggleEditMode}>
                                <h4>Edit</h4>
                            </Icon>
                        </Grid.Column>
                    </Grid.Row>
                    <center>
                        <br />
                        <Grid.Row>
                            <Grid.Column width={16} className="profileCard">
                                <Card>
                                    <Image src='https://melmagazine.com/wp-content/uploads/2018/08/1XjDnFVbf7Y22cfyrCFg31w.gif' wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{this.state.EditModeOn === false ?
                                            this.props.user.username
                                            :
                                            <Input value={this.props.user.username} size="mini" label="username" />
                                        }
                                        </Card.Header>
                                        <br />
                                        <Card.Meta>{this.state.EditModeOn === false ?
                                            this.props.user.email_address
                                            :
                                            <Input value={this.props.user.email_address} size="medium" label="email" />
                                        }
                                        </Card.Meta>
                                        <br />
                                        <Card.Meta>{this.state.EditModeOn === false ?
                                            this.props.user.phone_number
                                            :
                                            <Input value={this.props.user.phone_number} size="medium" label="phone" />
                                        }
                                        </Card.Meta>
                                        <br />
                                        {this.state.EditModeOn === true ?
                                            <Card.Meta>
                                                <Button size="big">Submit Changes</Button>
                                            </Card.Meta>
                                            :
                                            <>
                                            </>
                                        }
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </center>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(Profile);