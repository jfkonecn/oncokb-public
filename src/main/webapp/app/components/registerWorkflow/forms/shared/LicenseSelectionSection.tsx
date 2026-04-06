import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ButtonSelections } from 'app/components/LicenseSelection';
import { getSectionClassName } from 'app/pages/account/AccountUtils';
import { FormSection } from '../accountRegistrationFormShared';
import { useAccountRegistrationForm } from '../AccountRegistrationFormContext';

export const LicenseSelectionSection: React.FC = () => {
  const {
    isLargeScreen,
    licenseSelectionIntro,
    onSelectLicense,
    selectedCompanyOption,
    selectedLicense,
    visibleSections,
  } = useAccountRegistrationForm();

  if (!visibleSections.includes(FormSection.LICENSE)) {
    return null;
  }

  return (
    <>
      <Row className={getSectionClassName(true)}>
        <Col xs={12}>
          <h6>{licenseSelectionIntro}</h6>
        </Col>
      </Row>
      <Row className={getSectionClassName(false)}>
        <Col md="3">
          <h5>Choose your license type</h5>
        </Col>
        <Col md="9">
          <ButtonSelections
            isLargeScreen={isLargeScreen}
            selectedButton={selectedLicense}
            onSelectLicense={onSelectLicense}
            disabled={!!selectedCompanyOption}
          />
          {!selectedCompanyOption ? null : (
            <span>
              User should have same license type as their company. Unselect
              company to enable license selection.
            </span>
          )}
        </Col>
      </Row>
    </>
  );
};
