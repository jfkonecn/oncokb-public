import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormSection } from '../accountRegistrationFormShared';
import { useAccountRegistrationForm } from '../AccountRegistrationFormContext';

export const SelectedLicenseInfoSection: React.FC = () => {
  const { selectedLicenseInfo, visibleSections } = useAccountRegistrationForm();

  if (!visibleSections.includes(FormSection.LICENSE) || !selectedLicenseInfo) {
    return null;
  }

  return (
    <Row>
      <Col md="9" className={'ml-auto'}>
        {selectedLicenseInfo}
      </Col>
    </Row>
  );
};
