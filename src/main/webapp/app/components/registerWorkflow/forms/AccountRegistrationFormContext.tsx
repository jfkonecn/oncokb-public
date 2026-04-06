import React, { createContext, useContext } from 'react';
import { LicenseType } from 'app/config/constants';
import {
  AccountType,
  CompanySelectOptionType,
  FormSection,
} from './accountRegistrationFormShared';

export type AccountRegistrationFormContextValue = {
  apiAccessRequested: boolean;
  byAdmin: boolean;
  companyDescriptionPlaceholder: string;
  companyOptions: CompanySelectOptionType[];
  email: string;
  isCommercialLicense: boolean;
  isLargeScreen: boolean;
  licenseSelectionIntro: React.ReactNode;
  onApiAccessRequestToggle: () => void;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectCompany: (selectedOption: CompanySelectOptionType) => void;
  onSelectLicense: (license: LicenseType | undefined) => void;
  password: string;
  selectedAccountType: AccountType;
  selectedCompanyOption?: CompanySelectOptionType;
  selectedLicense?: LicenseType;
  selectedLicenseInfo?: React.ReactNode;
  setSelectedAccountType: (accountType: AccountType) => void;
  showEmailMismatchConfirmation: boolean;
  showNoGracePeriodWarning: boolean;
  useCasePlaceholder: string;
  visibleSections: FormSection[];
};

const AccountRegistrationFormContext = createContext<
  AccountRegistrationFormContextValue | undefined
>(undefined);

export const AccountRegistrationFormProvider =
  AccountRegistrationFormContext.Provider;

export function useAccountRegistrationForm() {
  const context = useContext(AccountRegistrationFormContext);
  if (!context) {
    throw new Error(
      'useAccountRegistrationForm must be used within AccountRegistrationFormProvider'
    );
  }
  return context;
}
