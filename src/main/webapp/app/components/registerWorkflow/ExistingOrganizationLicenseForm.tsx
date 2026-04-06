import React, { useState } from 'react';
import { AvForm } from 'availity-reactstrap-validation';
import { Alert } from 'react-bootstrap';
import { ManagedUserVM } from 'app/shared/api/generated/API';
import { LicenseType, ONCOKB_TM } from 'app/config/constants';
import client from 'app/shared/api/clientInstance';
import { ErrorAlert } from 'app/shared/alert/ErrorAlert';
import { OncoKBError } from 'app/shared/alert/ErrorAlertUtils';
import styles from 'app/components/newAccountForm/NewAccountForm.module.scss';
import {
  AccountType,
  ACCOUNT_TYPE_DEFAULT,
  FormSection,
} from './forms/AccountRegistrationForm';
import {
  AccountRegistrationFormContextValue,
  AccountRegistrationFormProvider,
} from './forms/AccountRegistrationFormContext';
import { AccountInfoSection } from './forms/shared/AccountInfoSection';
import { ExistingOrganizationSection } from './forms/shared/ExistingOrganizationSection';
import { SelectedLicenseInfoSection } from './forms/shared/SelectedLicenseInfoSection';
import { SubmitSection } from './forms/shared/SubmitSection';

export const ExistingOrganizationLicenseForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [registerError, setRegisterError] = useState<OncoKBError | undefined>(
    undefined
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleValidSubmit = (event: any, values: any) => {
    const managedUserVm = ({
      login: values.email,
      password: values.firstPassword,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      licenseType: LicenseType.EXISTING,
      companyName: values.companyName,
      city: values.city,
      country: values.country,
    } as unknown) as ManagedUserVM;

    client.registerAccountUsingPOST({ managedUserVm }).then(
      () => {
        setSubmitted(true);
        setRegisterError(undefined);
        window.scrollTo(0, 0);
      },
      (error: OncoKBError) => {
        setSubmitted(false);
        setRegisterError(error);
        window.scrollTo(0, 0);
      }
    );
  };

  const contextValue: AccountRegistrationFormContextValue = {
    apiAccessRequested: false,
    byAdmin: false,
    companyDescriptionPlaceholder: '',
    companyOptions: [],
    email,
    isCommercialLicense: true,
    isLargeScreen: true,
    licenseSelectionIntro: null,
    onApiAccessRequestToggle: () => undefined,
    onEmailChange: event => setEmail(event.target.value),
    onPasswordChange: event => setPassword(event.target.value),
    onSelectCompany: () => undefined,
    onSelectLicense: () => undefined,
    password,
    selectedAccountType: ACCOUNT_TYPE_DEFAULT,
    selectedCompanyOption: undefined,
    selectedLicense: LicenseType.EXISTING,
    selectedLicenseInfo: (
      <p>
        Use this form if your organization already has an {ONCOKB_TM} license
        and you need an individual account under that existing agreement.
      </p>
    ),
    setSelectedAccountType: (_accountType: AccountType) => undefined,
    showEmailMismatchConfirmation: false,
    showNoGracePeriodWarning: false,
    useCasePlaceholder: '',
    visibleSections: [FormSection.LICENSE, FormSection.ACCOUNT],
  };

  return (
    <>
      {registerError ? <ErrorAlert error={registerError} /> : null}
      {submitted ? (
        <Alert variant="success">
          Existing organization license form submitted.
        </Alert>
      ) : null}
      <AvForm className={styles.form} onValidSubmit={handleValidSubmit}>
        <AccountRegistrationFormProvider value={contextValue}>
          <SelectedLicenseInfoSection />
          <AccountInfoSection />
          <ExistingOrganizationSection />
          <SubmitSection />
        </AccountRegistrationFormProvider>
      </AvForm>
    </>
  );
};
