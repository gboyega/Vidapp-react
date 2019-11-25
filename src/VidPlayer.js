import React, {Component} from 'react';
import { Form, Container } from 'semantic-ui-react'

class VidPlayer extends Component{

  render(){
    return(
      <div>
        <Container textAlign='center'>
          <Form  size="medium">
            <Form.Group>
              <Form.Input placeholder="Video Name/Tag" width={6} />
              <Form.Button content="Get Videos" />
            </Form.Group>
          </Form>
        </Container>
      </div>
    )
  }
}

export default VidPlayer;
