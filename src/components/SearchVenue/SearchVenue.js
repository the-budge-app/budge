import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        console.log(this.state)
    }

    render() {
        return(
            <div style={styles.search}>
                <Input placeholder="Search a venue" onChange={this.handleInput} value={this.state.venueName}/>
                <Button primary style={styles.button} onClick={this.handleSearch}>Go</Button>
                <Button secondary style={styles.button}>Reset</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapStateToProps)(SearchVenue);