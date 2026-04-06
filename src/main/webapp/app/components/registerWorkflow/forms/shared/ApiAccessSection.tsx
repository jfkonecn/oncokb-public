import React from 'react';
import {
  AvCheckbox,
  AvCheckboxGroup,
  AvField,
} from 'availity-reactstrap-validation';
import { Col, Row } from 'react-bootstrap';
import { getSectionClassName } from 'app/pages/account/AccountUtils';
import { ONCOKB_TM } from 'app/config/constants';
import { NOT_USED_IN_AI_MODELS } from 'app/config/constants/terms';
import { LONG_TEXT_VAL } from 'app/shared/utils/FormValidationUtils';
import { FormKey } from '../accountRegistrationFormShared';
import { useAccountRegistrationForm } from '../AccountRegistrationFormContext';

export const ApiAccessSection: React.FC = () => {
  const {
    apiAccessRequested,
    onApiAccessRequestToggle,
  } = useAccountRegistrationForm();
  return (
    <Row className={getSectionClassName()}>
      <Col md="3">
        <h5>API Access</h5>
      </Col>
      <Col md="9">
        <p>
          Would you like programmatic access to the {ONCOKB_TM} database via our
          API? API access allows a user to simultaneously annotate multiple
          tumor mutations with {ONCOKB_TM} data and provides a text file output.
          {` ${ONCOKB_TM} `}API access may also enable the user to leverage
          {` ${ONCOKB_TM} `}alongside other platform APIs.
        </p>
        <p>
          Should you request API access, you must provide a detailed description
          on how you plan to use {ONCOKB_TM} APIs. Additional time for user
          screening will be required to grant access.
        </p>
        <p>
          The following use cases do <b>not</b> require API access:
        </p>
        <ul style={{ listStyleType: 'circle' }}>
          <li>Browse {ONCOKB_TM} content on our website</li>
          <li>
            Download data from our website (Actionable Genes, Precision Oncology
            Therapies, Cancer Genes etc.)
          </li>
          <li>
            View therapeutic implication descriptions (treatment descriptions)
          </li>
        </ul>
        <AvCheckboxGroup
          name={FormKey.REQUEST_API_ACCESS}
          key={FormKey.REQUEST_API_ACCESS}
          errorMessage={'You have to accept the term'}
        >
          <AvCheckbox
            label={'Request API Access'}
            value={apiAccessRequested}
            onChange={onApiAccessRequestToggle}
          />
        </AvCheckboxGroup>
        {apiAccessRequested ? (
          <div className="mt-2">
            <b style={{ fontSize: '0.8rem', lineHeight: '1' }}>
              {NOT_USED_IN_AI_MODELS}
            </b>
            <AvField
              name={FormKey.API_ACCESS_JUSTIFICATION}
              placeholder={
                'Provide a justification for your API access request'
              }
              rows={6}
              type={'textarea'}
              required={apiAccessRequested}
              validate={{
                ...LONG_TEXT_VAL,
                required: {
                  value: true,
                  errorMessage: 'Your justification is required.',
                },
              }}
            />
          </div>
        ) : null}
      </Col>
    </Row>
  );
};
