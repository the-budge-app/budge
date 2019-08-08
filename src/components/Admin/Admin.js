import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Card } from 'semantic-ui-react';

class Admin extends Component {

    componentDidMount() {
        console.log('test');
        this.props.dispatch({ type: 'FETCH_COMMENTS' })

    }

    deleteComment = (id) =>{ 
        this.props.dispatch({
            type: 'DELETE_COMMENT',
            payload: id
        })
        
    }

    render() {
        return (
            <div>
                <h1>Budge Admin Page</h1>
                {/* <pre>{JSON.stringify(this.props.reduxState.userComments, null, 2)}</pre> */}
                {this.props.reduxState.userComments.length && this.props.reduxState.userComments.map(comments => <div key={comments.id}>


                    <br/>
                    <Card fluid>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <h4>{comments.first_name} {comments.last_name}</h4>
                                <h4>{comments.email_address}</h4>
                                <h4>{comments.phone_number}</h4>
                                <Button onClick={() => this.deleteComment(comments.id)} style={{float: 'right'}}>Delete</Button>
                                <br/>
                                <h4>Customer Comments</h4>
                                <h4>{comments.comments}</h4>
                                <br/>
                               
                            </Grid.Column>
                            
                            </Grid.Row>
                            
                    </Grid>
                    </Card>

                </div>)}
            </div>
        )
    }
}


const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(Admin);