import React from 'react';
import { AccountInfoSection } from './shared/AccountInfoSection';
import { AdminAccountTypeSection } from './shared/AdminAccountTypeSection';
import { CompanySection } from './shared/CompanySection';
import { LicenseSelectionSection } from './shared/LicenseSelectionSection';
import { SelectedLicenseInfoSection } from './shared/SelectedLicenseInfoSection';
import { SubmitSection } from './shared/SubmitSection';
import { useAccountRegistrationForm } from './AccountRegistrationFormContext';

export const CommercialAccountRegistrationForm: React.FC = () => {
  const { byAdmin } = useAccountRegistrationForm();
  return (
    <>
      <LicenseSelectionSection />
      <SelectedLicenseInfoSection />
      <AccountInfoSection />
      <CompanySection />
      {byAdmin ? <AdminAccountTypeSection /> : null}
      <SubmitSection />
    </>
  );
};
