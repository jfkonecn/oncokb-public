import React from 'react';
import { AvCheckbox, AvCheckboxGroup } from 'availity-reactstrap-validation';
import { Col, Row } from 'react-bootstrap';
import { getSectionClassName } from 'app/pages/account/AccountUtils';
import { ACADEMIC_TERMS } from 'app/config/constants';

export const AcademicTermsSection: React.FC = () => {
  return (
    <Row className={getSectionClassName()}>
      <Col md="3">
        <h5>Terms</h5>
      </Col>
      <Col md="9">
        <p>
          In order to be granted access to downloadable content and our API,
          please agree to the following terms:
        </p>
        {ACADEMIC_TERMS.map(term => (
          <AvCheckboxGroup
            name={term.key}
            required
            key={term.key}
            errorMessage={'You have to accept the term'}
          >
            <AvCheckbox label={term.description} value={term.key} />
          </AvCheckboxGroup>
        ))}
      </Col>
    </Row>
  );
};
