import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Sidebar, Menu, Card, Icon, Image, Rating, Checkbox } from 'semantic-ui-react'

const styles = {
    mainDiv: {
        textAlign: 'center',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

class Venue extends Component {

    state = {
        active: true,
      }
    
      toggleButton = () => {
        this.setState({
          active: !this.state.active
        })
      }
    handleClick = () => {
        console.log('button test');
        

    }
    render() {
        const { active } = this.state
        return (
            <div style={styles.mainDiv}>

                <h3>Restaurant Name</h3>
                <h4>phone number</h4>
                <h4>Address</h4>

              <h3>Waitlist</h3>
             
               <label>Budgable</label>
                <Checkbox toggle></Checkbox>
                <label>All Parties</label>
                <br />
                <br />
                <br />
                <Button fluid onClick={this.handleClick}><Icon name="user"/>Party Size  <Icon name="clock"/>Quoted Time<Icon name="dont"/>Last rejected Offer</Button>
                <br />
                {this.state.active ?
                <Button fluid toggle active={active} onClick={this.toggleButton}>Join Waitlist</Button>
                :
                <Button fluid toggle active={active} onClick={this.toggleButton}>Leave Waitlist</Button>
                }
            </div>






        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(Venue);