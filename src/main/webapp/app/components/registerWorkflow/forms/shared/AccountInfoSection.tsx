import React from 'react';
import { AvField } from 'availity-reactstrap-validation';
import { Alert, Col, Row } from 'react-bootstrap';
import { If, Then } from 'react-if';
import PasswordStrengthBar from 'app/shared/password/password-strength-bar';
import {
  getAccountInfoTitle,
  getSectionClassName,
} from 'app/pages/account/AccountUtils';
import { ACCOUNT_TITLES } from 'app/config/constants';
import {
  EMAIL_VAL,
  OPTIONAL_TEXT_VAL,
  SHORT_TEXT_VAL,
} from 'app/shared/utils/FormValidationUtils';
import { FormSection } from '../accountRegistrationFormShared';
import { useAccountRegistrationForm } from '../AccountRegistrationFormContext';

export const AccountInfoSection: React.FC = () => {
  const {
    byAdmin,
    email,
    onEmailChange,
    onPasswordChange,
    password,
    selectedLicense,
    showEmailMismatchConfirmation,
    showNoGracePeriodWarning,
    visibleSections,
  } = useAccountRegistrationForm();

  if (!visibleSections.includes(FormSection.ACCOUNT) || !selectedLicense) {
    return null;
  }

  return (
    <Row
      className={
        visibleSections.includes(FormSection.LICENSE)
          ? getSectionClassName()
          : undefined
      }
    >
      <Col md="3">
        <h5>Account Information</h5>
      </Col>
      <Col md="9">
        <AvField
          name="firstName"
          autoComplete="given-name"
          label={getAccountInfoTitle(
            ACCOUNT_TITLES.FIRST_NAME,
            selectedLicense
          )}
          validate={{
            required: {
              value: true,
              errorMessage: 'Your first name is required.',
            },
            ...SHORT_TEXT_VAL,
          }}
        />
        <AvField
          name="lastName"
          autoComplete="family-name"
          label={getAccountInfoTitle(ACCOUNT_TITLES.LAST_NAME, selectedLicense)}
          validate={{
            required: {
              value: true,
              errorMessage: 'Your last name is required.',
            },
            ...SHORT_TEXT_VAL,
          }}
        />
        <AvField
          name="jobTitle"
          label={getAccountInfoTitle(ACCOUNT_TITLES.POSITION, selectedLicense)}
          validate={{ ...OPTIONAL_TEXT_VAL }}
        />
        <AvField
          name="email"
          label={getAccountInfoTitle(ACCOUNT_TITLES.EMAIL, selectedLicense)}
          type="email"
          value={email}
          onChange={onEmailChange}
          validate={EMAIL_VAL}
        />
        {showNoGracePeriodWarning ? (
          <Alert variant={'warning'}>
            <i className={'mr-2 fa fa-exclamation-triangle'}></i>
            <span>
              You are using a personal email address. You will not get a grace
              period while your account request is under review.
            </span>
          </Alert>
        ) : null}
        {showEmailMismatchConfirmation ? (
          <Alert variant={'warning'}>
            <i className={'mr-2 fa fa-exclamation-triangle'}></i>
            <span>
              The entered email address domain does not match any of the
              company&apos;s domains. Please confirm before proceeding.
            </span>
          </Alert>
        ) : null}
        <If condition={!byAdmin}>
          <Then>
            <AvField
              name="firstPassword"
              label="Password"
              autoComplete="password"
              placeholder={'Password'}
              type="password"
              onChange={onPasswordChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Your password is required.',
                },
                minLength: {
                  value: 4,
                  errorMessage:
                    'Your password is required to be at least 4 characters.',
                },
                maxLength: {
                  value: 50,
                  errorMessage:
                    'Your password cannot be longer than 50 characters.',
                },
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="Password confirmation"
              autoComplete="password"
              placeholder="Confirm the password"
              type="password"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Your confirmation password is required.',
                },
                minLength: {
                  value: 4,
                  errorMessage:
                    'Your confirmation password is required to be at least 4 characters.',
                },
                maxLength: {
                  value: 50,
                  errorMessage:
                    'Your confirmation password cannot be longer than 50 characters.',
                },
                match: {
                  value: 'firstPassword',
                  errorMessage:
                    'The password and its confirmation do not match!',
                },
              }}
            />
          </Then>
        </If>
      </Col>
    </Row>
  );
};
