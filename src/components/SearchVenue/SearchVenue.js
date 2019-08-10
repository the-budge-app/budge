import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

//semantic ui
import { Button, Input } from 'semantic-ui-react';

const styles = {
    search: {
        margin: "20px auto",
        width: "90%",
    },
    button: {
        margin: "5px",
        width: "20%",
        padding: '10px 0px',
    }
}

class SearchVenue extends Component {

    state={
        venueName: '',
    }
    //capture the user input and store in local state
    handleInput = (event) => {
        this.setState({
            venueName: event.target.value,
        })
    }
    //function to run the search
    handleSearch = () => {
        axios.get(`/api/search/venue?name=${this.state.venueName}`)
            .then(response => {
                //store the search result in reducer
                this.props.dispatch({type: 'SET_VENUE_LIST', payload: response.data});
                //clear input box
                this.setState({
                    venueName: '',
                })
            })
    }
    //function to reset the map -> display all venues
    handleReset = () => {
        this.props.dispatch({ type: 'FETCH_VENUE_LIST' });
    }

    render() {
        return(
            <div style={styles.search}>
                <Input placeholder="Search a venue" onChange={this.handleInput} value={this.state.venueName}/>
                <Button primary style={styles.button} onClick={this.handleSearch}>Go</Button>
                <Button secondary style={styles.button} onClick={this.handleReset}>Reset</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapStateToProps)(SearchVenue);