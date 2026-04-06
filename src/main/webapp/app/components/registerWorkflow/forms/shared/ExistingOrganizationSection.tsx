import React from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { Col, Row } from 'react-bootstrap';
import { ACCOUNT_TITLES, LicenseType } from 'app/config/constants';
import {
  getAccountInfoTitle,
  getSectionClassName,
} from 'app/pages/account/AccountUtils';
import { TEXT_VAL } from 'app/shared/utils/FormValidationUtils';

export const ExistingOrganizationSection: React.FC = () => {
  return (
    <Row className={getSectionClassName()}>
      <Col md="3">
        <h5>
          {getAccountInfoTitle(
            ACCOUNT_TITLES.COMPANY_SECTION_TITLE,
            LicenseType.EXISTING
          )}
        </h5>
      </Col>
      <Col md="9">
        <AvField
          name="companyName"
          label={getAccountInfoTitle(
            ACCOUNT_TITLES.COMPANY,
            LicenseType.EXISTING
          )}
          validate={{
            required: {
              value: true,
              errorMessage: 'Your organization name is required.',
            },
            ...TEXT_VAL,
          }}
        />
        <AvField
          name="city"
          label={getAccountInfoTitle(ACCOUNT_TITLES.CITY, LicenseType.EXISTING)}
          validate={{
            required: {
              value: true,
              errorMessage: 'Please let us know where you are located.',
            },
            ...TEXT_VAL,
          }}
        />
        <AvField
          name="country"
          label={getAccountInfoTitle(
            ACCOUNT_TITLES.COUNTRY,
            LicenseType.EXISTING
          )}
          validate={{
            required: {
              value: true,
              errorMessage: 'Please let us know where you are located.',
            },
            ...TEXT_VAL,
          }}
        />
      </Col>
    </Row>
  );
};
