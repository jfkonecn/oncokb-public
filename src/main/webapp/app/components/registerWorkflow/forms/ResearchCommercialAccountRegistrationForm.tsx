import React from 'react';
import { AccountInfoSection } from './shared/AccountInfoSection';
import { AdminAccountTypeSection } from './shared/AdminAccountTypeSection';
import { ApiAccessSection } from './shared/ApiAccessSection';
import { CompanySection } from './shared/CompanySection';
import { LicenseSelectionSection } from './shared/LicenseSelectionSection';
import { SelectedLicenseInfoSection } from './shared/SelectedLicenseInfoSection';
import { SubmitSection } from './shared/SubmitSection';
import { useAccountRegistrationForm } from './AccountRegistrationFormContext';

export const ResearchCommercialAccountRegistrationForm: React.FC = () => {
  const { byAdmin } = useAccountRegistrationForm();
  return (
    <>
      <LicenseSelectionSection />
      <SelectedLicenseInfoSection />
      <AccountInfoSection />
      <CompanySection />
      <ApiAccessSection />
      {byAdmin ? <AdminAccountTypeSection /> : null}
      <SubmitSection />
    </>
  );
};
