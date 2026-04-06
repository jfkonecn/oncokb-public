import React from 'react';
import { LicenseType } from 'app/config/constants';
import { AcademicAccountRegistrationForm } from './AcademicAccountRegistrationForm';
import { CommercialAccountRegistrationForm } from './CommercialAccountRegistrationForm';
import { HospitalAccountRegistrationForm } from './HospitalAccountRegistrationForm';
import { ResearchCommercialAccountRegistrationForm } from './ResearchCommercialAccountRegistrationForm';
import { LicenseSelectionSection } from './shared/LicenseSelectionSection';
import { useAccountRegistrationForm } from './AccountRegistrationFormContext';

export const AccountRegistrationFormByLicense: React.FC = () => {
  const { selectedLicense } = useAccountRegistrationForm();

  if (!selectedLicense) {
    return <LicenseSelectionSection />;
  }

  switch (selectedLicense) {
    case LicenseType.ACADEMIC:
      return <AcademicAccountRegistrationForm />;
    case LicenseType.HOSPITAL:
      return <HospitalAccountRegistrationForm />;
    case LicenseType.RESEARCH_IN_COMMERCIAL:
      return <ResearchCommercialAccountRegistrationForm />;
    case LicenseType.COMMERCIAL:
    default:
      return <CommercialAccountRegistrationForm />;
  }
};
