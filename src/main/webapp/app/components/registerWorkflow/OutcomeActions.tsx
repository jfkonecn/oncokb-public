import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { PAGE_ROUTE } from 'app/config/constants';

type OutcomeActionsProps = {
  backUrl?: string;
  restartUrl?: string;
  canGoBack: boolean;
  canStartOver: boolean;
};

export function OutcomeActions({
  backUrl,
  restartUrl,
  canGoBack,
  canStartOver,
}: OutcomeActionsProps) {
  return (
    <Row className="mb-3">
      <Col>
        <div className="d-flex flex-wrap" style={{ gap: '1rem' }}>
          {canGoBack && backUrl ? <a href={backUrl}>Back</a> : null}
          {canStartOver ? <a href={restartUrl}>Start over</a> : null}
        </div>
      </Col>
      <Col className="d-flex justify-content-end align-items-center">
        <Link to={PAGE_ROUTE.LOGIN}>Already have an account? Login</Link>
      </Col>
    </Row>
  );
}
