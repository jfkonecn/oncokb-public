import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export const SubmitSection: React.FC = () => {
  return (
    <Row>
      <Col md={9} className={'ml-auto'}>
        <Button id="register-submit" variant="primary" type="submit">
          Register
        </Button>
      </Col>
    </Row>
  );
};
