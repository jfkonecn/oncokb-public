import React from 'react';
import {
  AvFeedback,
  AvField,
  AvGroup,
  AvInput,
} from 'availity-reactstrap-validation';
import { Col, Row } from 'react-bootstrap';
import FormSelectWithLabelField from 'app/shared/select/FormSelectWithLabelField';
import UseCaseExamples from 'app/components/newAccountForm/UseCaseExamples';
import ImportantNotes from 'app/components/newAccountForm/ImportantNotes';
import {
  getAccountInfoTitle,
  getSectionClassName,
} from 'app/pages/account/AccountUtils';
import { ACCOUNT_TITLES, LicenseType, ONCOKB_TM } from 'app/config/constants';
import { EMAIL_VAL, TEXT_VAL } from 'app/shared/utils/FormValidationUtils';
import styles from 'app/components/newAccountForm/NewAccountForm.module.scss';
import {
  FormKey,
  FormSection,
  SLACK_TEXT_VAL,
} from '../accountRegistrationFormShared';
import { useAccountRegistrationForm } from '../AccountRegistrationFormContext';

export const CompanySection: React.FC = () => {
  const {
    companyDescriptionPlaceholder,
    companyOptions,
    isCommercialLicense,
    onSelectCompany,
    selectedCompanyOption,
    selectedLicense,
    useCasePlaceholder,
    visibleSections,
  } = useAccountRegistrationForm();

  if (!visibleSections.includes(FormSection.COMPANY) || !selectedLicense) {
    return null;
  }

  return (
    <Row className={getSectionClassName()}>
      <Col md="3">
        <h5>
          {getAccountInfoTitle(
            ACCOUNT_TITLES.COMPANY_SECTION_TITLE,
            selectedLicense
          )}
        </h5>
      </Col>
      <Col md="9">
        {companyOptions.length > 0 ? (
          <FormSelectWithLabelField
            onSelection={onSelectCompany}
            labelText={'Select a company to register a user under'}
            name={'companyDropdown'}
            options={companyOptions}
            isClearable={true}
            value={selectedCompanyOption}
          />
        ) : null}
        {selectedCompanyOption ? null : (
          <div className={styles.companySection}>
            {selectedLicense !== LicenseType.ACADEMIC && (
              <p>
                Please feel free to skip this section if your{' '}
                {getAccountInfoTitle(
                  ACCOUNT_TITLES.COMPANY,
                  selectedLicense
                ).toLowerCase()}{' '}
                already has a license with us.
              </p>
            )}
            <AvField
              name="company"
              label={getAccountInfoTitle(
                ACCOUNT_TITLES.COMPANY,
                selectedLicense
              )}
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Your organization name is required.',
                },
                ...TEXT_VAL,
              }}
            />
            <AvField
              name="city"
              label={getAccountInfoTitle(ACCOUNT_TITLES.CITY, selectedLicense)}
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Please let us know where you located.',
                },
                ...TEXT_VAL,
              }}
            />
            <AvField
              name="country"
              label={getAccountInfoTitle(
                ACCOUNT_TITLES.COUNTRY,
                selectedLicense
              )}
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Please let us know where you located.',
                },
                ...TEXT_VAL,
              }}
            />
            <AvField
              name={FormKey.COMPANY_DESCRIPTION}
              label={`${getAccountInfoTitle(
                ACCOUNT_TITLES.COMPANY,
                selectedLicense
              )} Description`}
              type={'textarea'}
              placeholder={companyDescriptionPlaceholder}
              rows={4}
              validate={{ ...SLACK_TEXT_VAL }}
            />
            {isCommercialLicense ? (
              <>
                <AvField
                  name={FormKey.BUS_CONTACT_EMAIL}
                  label={'Business Contact Email'}
                  type="email"
                  validate={{
                    ...EMAIL_VAL,
                    required: { value: false },
                  }}
                />
                <AvField
                  name={FormKey.BUS_CONTACT_PHONE}
                  label={'Business Contact Phone Number'}
                  type="tel"
                />
              </>
            ) : null}
            <AvGroup className={styles.useCaseSection}>
              <label htmlFor={FormKey.USE_CASE}>
                {`Describe how you plan to use ${ONCOKB_TM} *`}
              </label>
              {[
                LicenseType.RESEARCH_IN_COMMERCIAL,
                LicenseType.ACADEMIC,
              ].includes(selectedLicense) ? (
                <UseCaseExamples />
              ) : null}
              <AvInput
                id={FormKey.USE_CASE}
                name={FormKey.USE_CASE}
                type={'textarea'}
                placeholder={useCasePlaceholder}
                rows={6}
                required
                validate={{
                  ...SLACK_TEXT_VAL,
                  required: {
                    value: true,
                    errorMessage: 'Your use case is required.',
                  },
                }}
              />
              <AvFeedback>Your use case is required.</AvFeedback>
            </AvGroup>
            <ImportantNotes />
            {[LicenseType.COMMERCIAL, LicenseType.HOSPITAL].includes(
              selectedLicense
            ) ? (
              <AvField
                name={FormKey.ANTICIPATED_REPORTS}
                label={'Anticipated # of reports annually for years 1, 2 and 3'}
                type={'textarea'}
                placeholder={`If you plan to incorporate ${ONCOKB_TM} contents in sequencing reports, please provide an estimate of your anticipated volume over the next several years`}
              />
            ) : null}
            {selectedLicense === LicenseType.RESEARCH_IN_COMMERCIAL ? (
              <AvField
                name={FormKey.COMPANY_SIZE}
                label={'Company Size (# of employees)'}
                type={'input'}
              />
            ) : null}
          </div>
        )}
      </Col>
    </Row>
  );
};
