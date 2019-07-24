import React, { Component } from 'react';
import { Button, Sidebar, Menu, Card, Icon, Image, Rating } from 'semantic-ui-react'

const styles = {
    mainDiv: {
        textAlign: 'center',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

class SemanticPlayground extends Component {
  state = {
    visible: false,
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <div id="mainTesting" style={styles.mainDiv}>
        <Button primary onClick={this.toggleVisible}>Testing</Button>
        <br />
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Please rate your Budge experience with Sally
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Rating icon='star' defaultRating={4} maxRating={5} />
          </Card.Content>
        </Card>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          vertical
          visible={this.state.visible}
          width='thin'
        >
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
            </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
            </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
            </Menu.Item>
        </Sidebar>
      </div>
    );
  }
}

export default SemanticPlayground;
