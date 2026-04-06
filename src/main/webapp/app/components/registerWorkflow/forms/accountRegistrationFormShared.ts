import {
  AdditionalInfoDTO,
  CompanyDTO,
  Contact,
} from 'app/shared/api/generated/API';
import {
  LicenseType,
  THRESHOLD_TRIAL_TOKEN_VALID_DEFAULT,
} from 'app/config/constants';
import { textValidation } from 'app/shared/utils/FormValidationUtils';

export enum FormSection {
  LICENSE = 'LICENSE',
  ACCOUNT = 'ACCOUNT',
  COMPANY = 'COMPANY',
}

export type WorkflowAccountRegistrationFormProps = {
  isLargeScreen: boolean;
  byAdmin: boolean;
  defaultLicense?: LicenseType;
  visibleSections?: FormSection[];
  gracePeriodBlacklistedDomains?: string[];
  onSelectLicense?: (newLicenseType: LicenseType | undefined) => void;
};

export enum AccountType {
  REGULAR = 'regular',
  TRIAL = 'trial',
}

export enum FormKey {
  ANTICIPATED_REPORTS = 'anticipatedReports',
  COMPANY_DESCRIPTION = 'companyDescription',
  USE_CASE = 'useCase',
  COMPANY_SIZE = 'companySize',
  BUS_CONTACT_EMAIL = 'businessContactEmail',
  BUS_CONTACT_PHONE = 'businessContactPhone',
  REQUEST_API_ACCESS = 'requestApiAccess',
  API_ACCESS_JUSTIFICATION = 'apiAccessJustification',
}

export type CompanySelectOptionType = {
  label: string;
  value: CompanyDTO;
};

export const SLACK_TEXT_VAL = textValidation(2, 1900);

export const ACCOUNT_TYPE_DEFAULT = AccountType.REGULAR;

export const DEFAULT_ACCOUNT_FORM_MODEL = {
  accountType: ACCOUNT_TYPE_DEFAULT,
  tokenValidDays: THRESHOLD_TRIAL_TOKEN_VALID_DEFAULT,
};

export function constructAdditionalInfo(
  values: any,
  apiAccessRequested: boolean,
  isCommercialLicense: boolean
) {
  const additionalInfo = {
    userCompany: {},
  } as AdditionalInfoDTO;

  if (values[FormKey.COMPANY_SIZE]) {
    additionalInfo.userCompany.size = values[FormKey.COMPANY_SIZE];
  }
  if (values[FormKey.COMPANY_DESCRIPTION]) {
    additionalInfo.userCompany.description =
      values[FormKey.COMPANY_DESCRIPTION];
  }

  [FormKey.ANTICIPATED_REPORTS, FormKey.USE_CASE].forEach(key => {
    if (values[key]) {
      additionalInfo.userCompany[key] = values[key];
    }
  });

  if (values[FormKey.BUS_CONTACT_EMAIL] || values[FormKey.BUS_CONTACT_PHONE]) {
    additionalInfo.userCompany.businessContact = {} as Contact;
    if (values[FormKey.BUS_CONTACT_EMAIL]) {
      additionalInfo.userCompany.businessContact.email =
        values[FormKey.BUS_CONTACT_EMAIL];
    }
    if (values[FormKey.BUS_CONTACT_PHONE]) {
      additionalInfo.userCompany.businessContact.phone =
        values[FormKey.BUS_CONTACT_PHONE];
    }
  }

  if (!isCommercialLicense) {
    additionalInfo.apiAccessRequest = {
      requested: apiAccessRequested,
      justification: values[FormKey.API_ACCESS_JUSTIFICATION],
    };
  }

  if (Object.keys(additionalInfo.userCompany).length === 0) {
    delete additionalInfo.userCompany;
  }

  return additionalInfo;
}
