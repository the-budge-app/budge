import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image } from 'semantic-ui-react';

class Profile extends Component {
    render() {
        return (
            <>
                <center>
                    <h2>Profile Page</h2>
                    <Card>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{this.props.user.username}</Card.Header>
                            <Card.Meta>
                                {this.props.user.email_address}
                            </Card.Meta>
                            <Card.Meta>
                                {this.props.user.phone_number}
                            </Card.Meta>
                        </Card.Content>

                    </Card>
                </center>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(Profile);