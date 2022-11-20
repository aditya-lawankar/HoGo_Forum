import React, { Component } from 'react';
import { Alert, Spinner, Button, Container } from 'react-bootstrap';
// import "./card.css"

export class card extends Component {
  render() {
    return (
      <Container classname="Profile">
        <Alert variant="success">
          <Alert.Heading>Hey, {this.props.dataFromParent}. </Alert.Heading>
          <p>Please wait for approval by the Home Owner</p>
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>{' '}
        </Alert>
      </Container>
    );
  }
}
export default card;
