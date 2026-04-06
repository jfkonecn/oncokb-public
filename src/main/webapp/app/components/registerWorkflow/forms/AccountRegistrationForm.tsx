import React, { useEffect, useState } from 'react';
import { AvForm } from 'availity-reactstrap-validation';
import { ManagedUserVM } from 'app/shared/api/generated/API';
import {
  ACCOUNT_TITLES,
  LicenseStatus,
  LicenseType,
  ONCOKB_TM,
} from 'app/config/constants';
import LicenseExplanation from 'app/shared/texts/LicenseExplanation';
import { LicenseInquireLink } from 'app/shared/links/LicenseInquireLink';
import { getAccountInfoTitle } from 'app/pages/account/AccountUtils';
import client from 'app/shared/api/clientInstance';
import { notifyError } from 'app/shared/utils/NotificationUtils';
import {
  DEFAULT_ACCOUNT_FORM_MODEL,
  AccountType,
  ACCOUNT_TYPE_DEFAULT,
  CompanySelectOptionType,
  FormSection,
  WorkflowAccountRegistrationFormProps,
  constructAdditionalInfo,
} from './accountRegistrationFormShared';
import { AccountRegistrationFormByLicense } from './AccountRegistrationFormByLicense';
import {
  AccountRegistrationFormProvider,
  AccountRegistrationFormContextValue,
} from './AccountRegistrationFormContext';
import styles from 'app/components/newAccountForm/NewAccountForm.module.scss';

export { AccountType, ACCOUNT_TYPE_DEFAULT, FormSection };

type AccountRegistrationFormProps = WorkflowAccountRegistrationFormProps & {
  onSubmit: (newUser: Partial<ManagedUserVM>) => void;
};

type LicenseAdditionalInfoProps = {
  licenseType: LicenseType;
  visibleSections?: FormSection[];
};

const LicenseAdditionalInfo: React.FC<LicenseAdditionalInfoProps> = ({
  licenseType,
  visibleSections,
}) => {
  if (licenseType === LicenseType.ACADEMIC) {
    return (
      <p>
        {ONCOKB_TM} is accessible for no fee for research use in academic
        setting. This license type requires that you register your account using
        your institution/university email address.{' '}
        <b>
          Please complete the form below to create your {ONCOKB_TM} account.
        </b>
      </p>
    );
  }

  if (licenseType === LicenseType.COMMERCIAL) {
    return (
      <>
        <p>
          To use {ONCOKB_TM} in a commercial product, your company will need a
          license. A typical example of this is if you are part of a company
          that would like to incorporate {ONCOKB_TM} content into sequencing
          reports.
        </p>
        <p>
          <b>
            Please complete the form below to create your {ONCOKB_TM} account.
          </b>{' '}
          {visibleSections?.includes(FormSection.COMPANY) ? (
            <span>
              If your company already has a license, you can skip certain fields
              and we will grant you API access shortly. Otherwise, we will
              contact you with license terms.
            </span>
          ) : null}{' '}
          You can also reach out to <LicenseInquireLink /> for more information.
        </p>
      </>
    );
  }

  if (licenseType === LicenseType.HOSPITAL) {
    return (
      <>
        <p>
          To incorporate {ONCOKB_TM} content into patient sequencing reports,
          your hospital will need a license.
        </p>
        <p>
          <b>
            Please complete the form below to create your {ONCOKB_TM} account.
          </b>{' '}
          {visibleSections?.includes(FormSection.COMPANY) ? (
            <span>
              If your hospital already has a license, we will grant you API
              access shortly. Otherwise, we will contact you with license terms.
            </span>
          ) : null}{' '}
          You can also reach out to <LicenseInquireLink /> for more information.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        To use {ONCOKB_TM} for research purposes in a commercial setting, your
        company will need a license.
      </p>
      <p>
        <b>
          Please complete the form below to create your {ONCOKB_TM} account.
        </b>{' '}
        {visibleSections?.includes(FormSection.COMPANY) ? (
          <span>
            If your company already has a license, we will grant you API access
            shortly. Otherwise, we will contact you with license terms.
          </span>
        ) : null}{' '}
        You can also reach out to <LicenseInquireLink /> for more information.
      </p>
    </>
  );
};

export function AccountRegistrationForm(props: AccountRegistrationFormProps) {
  const visibleSections = props.visibleSections || Object.values(FormSection);
  const gracePeriodBlacklistedDomains =
    props.gracePeriodBlacklistedDomains || [];
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLicense, setSelectedLicense] = useState<
    LicenseType | undefined
  >(props.defaultLicense);
  const [selectedAccountType, setSelectedAccountType] = useState(
    ACCOUNT_TYPE_DEFAULT
  );
  const [companyOptions, setCompanyOptions] = useState<
    CompanySelectOptionType[]
  >([]);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState<
    CompanySelectOptionType | undefined
  >(undefined);
  const [apiAccessRequested, setApiAccessRequested] = useState(false);

  useEffect(() => {
    if (!props.byAdmin) {
      return;
    }
    let cancelled = false;
    client
      .getAllCompaniesUsingGET({})
      .then(companies => {
        if (cancelled) {
          return;
        }
        setCompanyOptions(
          companies.map(company => ({
            label: `${company.name} (${company.companyType})`,
            value: company,
          }))
        );
      })
      .catch(error => notifyError(error));

    return () => {
      cancelled = true;
    };
  }, [props.byAdmin]);

  const isCommercialLicense = selectedLicense !== LicenseType.ACADEMIC;
  const companyDescriptionBase =
    'Provide a brief description of the ' +
    getAccountInfoTitle(ACCOUNT_TITLES.COMPANY, selectedLicense).toLowerCase();
  const companyDescriptionPlaceholder = isCommercialLicense
    ? companyDescriptionBase +
      ':\n' +
      ` - Key products and services that relate to ${ONCOKB_TM}\n` +
      ` - Approximate size of the ${getAccountInfoTitle(
        ACCOUNT_TITLES.COMPANY,
        selectedLicense
      ).toLowerCase()} (e.g., FTE, revenue, etc.)`
    : companyDescriptionBase;
  const useCasePlaceholderBase = `Provide a description of how you plan to use ${ONCOKB_TM}`;
  const useCasePlaceholder = isCommercialLicense
    ? useCasePlaceholderBase +
      '\n' +
      `  - What product or service do you plan to incorporate ${ONCOKB_TM} content into?\n` +
      `  - How will the product be delivered to the end user (e.g., patient report${
        selectedLicense === LicenseType.COMMERCIAL ? ', SaaS offering' : ''
      })?`
    : useCasePlaceholderBase;

  const onSelectLicense = (license: LicenseType | undefined) => {
    setSelectedLicense(license);
    if (props.onSelectLicense) {
      props.onSelectLicense(license);
    }
  };

  const onSelectCompany = (selectedOption: CompanySelectOptionType) => {
    setSelectedCompanyOption(selectedOption);
    if (selectedOption) {
      setSelectedAccountType(
        selectedOption.value.licenseStatus === LicenseStatus.TRIAL
          ? AccountType.TRIAL
          : AccountType.REGULAR
      );
      onSelectLicense(selectedOption.value.licenseType as LicenseType);
    }
  };

  const emailDomain = email.substring(
    email.includes('@') ? email.indexOf('@') + 1 : email.length
  );
  const hasADomainMatch = selectedCompanyOption?.value.companyDomains.some(
    domain => domain === emailDomain
  );
  const showEmailMismatchConfirmation =
    email.length > 5 && !!selectedCompanyOption && !hasADomainMatch;

  let showNoGracePeriodWarning = false;
  if (email) {
    const normalizedEmail = email.toLowerCase();
    const atIndex = normalizedEmail.lastIndexOf('@');
    if (atIndex >= 0 && atIndex !== normalizedEmail.length - 1) {
      const domain = normalizedEmail.substring(atIndex + 1);
      showNoGracePeriodWarning = gracePeriodBlacklistedDomains.includes(domain);
    }
  }

  const handleValidSubmit = (event: any, values: any) => {
    const newUser: Partial<ManagedUserVM> = {
      login: values.email,
      password,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      licenseType: selectedLicense,
      tokenIsRenewable: selectedAccountType !== AccountType.TRIAL,
      jobTitle: values.jobTitle,
      company: selectedCompanyOption?.value,
      companyName: selectedCompanyOption
        ? selectedCompanyOption.value.name
        : values.company,
      city: values.city,
      country: values.country,
    };
    const additionalInfo = constructAdditionalInfo(
      values,
      apiAccessRequested,
      isCommercialLicense
    );
    if (Object.keys(additionalInfo).length > 0) {
      newUser.additionalInfo = additionalInfo;
    }
    if (values.tokenValidDays) {
      newUser.tokenValidDays = Number(values.tokenValidDays);
      newUser.notifyUserOnTrialCreation = true;
    }
    props.onSubmit(newUser);
  };

  const contextValue: AccountRegistrationFormContextValue = {
    apiAccessRequested,
    byAdmin: props.byAdmin,
    companyDescriptionPlaceholder,
    companyOptions,
    email,
    isCommercialLicense,
    isLargeScreen: props.isLargeScreen,
    licenseSelectionIntro: <LicenseExplanation />,
    onApiAccessRequestToggle: () => setApiAccessRequested(current => !current),
    onEmailChange: event => setEmail(event.target.value),
    onPasswordChange: event => setPassword(event.target.value),
    onSelectCompany,
    onSelectLicense,
    password,
    selectedAccountType,
    selectedCompanyOption,
    selectedLicense,
    selectedLicenseInfo: selectedLicense ? (
      <LicenseAdditionalInfo
        licenseType={selectedLicense}
        visibleSections={visibleSections}
      />
    ) : undefined,
    setSelectedAccountType,
    showEmailMismatchConfirmation,
    showNoGracePeriodWarning,
    useCasePlaceholder,
    visibleSections,
  };

  return (
    <AvForm
      className={styles.form}
      onValidSubmit={handleValidSubmit}
      model={DEFAULT_ACCOUNT_FORM_MODEL}
    >
      <AccountRegistrationFormProvider value={contextValue}>
        <AccountRegistrationFormByLicense />
      </AccountRegistrationFormProvider>
    </AvForm>
  );
}
