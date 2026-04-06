import React from 'react';
import { AvField, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Col, Row } from 'react-bootstrap';
import { getSectionClassName } from 'app/pages/account/AccountUtils';
import {
  AccountType,
  ACCOUNT_TYPE_DEFAULT,
} from '../accountRegistrationFormShared';
import { useAccountRegistrationForm } from '../AccountRegistrationFormContext';

export const AdminAccountTypeSection: React.FC = () => {
  const {
    selectedAccountType,
    selectedCompanyOption,
    setSelectedAccountType,
  } = useAccountRegistrationForm();
  return (
    <Row className={getSectionClassName()}>
      <Col md="3">
        <h5>Account Type</h5>
      </Col>
      <Col md="9">
        <AvRadioGroup
          inline
          name="accountType"
          label=""
          required
          onChange={(event: any, value: AccountType | undefined) => {
            setSelectedAccountType(value || ACCOUNT_TYPE_DEFAULT);
          }}
          value={selectedAccountType}
          disabled={!!selectedCompanyOption}
        >
          <AvRadio label={AccountType.REGULAR} value={AccountType.REGULAR} />
          <AvRadio label={AccountType.TRIAL} value={AccountType.TRIAL} />
        </AvRadioGroup>
        {selectedAccountType === AccountType.TRIAL ? (
          <>
            <div className={'mt-2'}>
              <AvField
                name="tokenValidDays"
                label="Account Expires in Days"
                required
                validate={{ number: true }}
              />
            </div>
            <span>
              A trial license agreement email will be sent to the user.
            </span>
          </>
        ) : null}
      </Col>
    </Row>
  );
};
