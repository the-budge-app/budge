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

    render() {
        return(
            <div style={styles.search}>
                <Input placeholder="Search a venue"/>
                <Button primary style={styles.button}>Go</Button>
                <Button secondary style={styles.button}>Reset</Button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapStateToProps)(SearchVenue);