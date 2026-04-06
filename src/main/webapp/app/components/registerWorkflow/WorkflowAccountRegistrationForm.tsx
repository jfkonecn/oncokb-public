import React from 'react';
import { LicenseType } from 'app/config/constants';
import {
  AccountRegistrationForm,
  FormSection,
} from './forms/AccountRegistrationForm';

type WorkflowAccountRegistrationFormProps = {
  defaultLicense: LicenseType;
  isLargeScreen: boolean;
  onSubmit: Parameters<typeof AccountRegistrationForm>[0]['onSubmit'];
};

export const WorkflowAccountRegistrationForm: React.FC<WorkflowAccountRegistrationFormProps> = ({
  defaultLicense,
  isLargeScreen,
  onSubmit,
}) => {
  return (
    <AccountRegistrationForm
      byAdmin={false}
      defaultLicense={defaultLicense}
      isLargeScreen={isLargeScreen}
      onSubmit={onSubmit}
      visibleSections={[FormSection.ACCOUNT, FormSection.COMPANY]}
    />
  );
};
