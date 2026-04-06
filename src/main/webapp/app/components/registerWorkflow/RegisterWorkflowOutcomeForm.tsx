import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { ManagedUserVM } from 'app/shared/api/generated/API';
import { LicenseType, ONCOKB_LICENSE_EMAIL } from 'app/config/constants';
import client from 'app/shared/api/clientInstance';
import { ErrorAlert } from 'app/shared/alert/ErrorAlert';
import { OncoKBError } from 'app/shared/alert/ErrorAlertUtils';
import { WorkflowOutcome } from './registerWorkflowData';
import { ExistingOrganizationLicenseForm } from './ExistingOrganizationLicenseForm';
import { WorkflowAccountRegistrationForm } from './WorkflowAccountRegistrationForm';
import { WorkflowOnlyOutcomeForm } from './WorkflowOnlyOutcomeForm';

type RegisterWorkflowOutcomeFormProps = {
  isLargeScreen: boolean;
  outcome?: WorkflowOutcome;
};

type RegistrationOutcomePanelProps = {
  defaultLicense: LicenseType;
  isLargeScreen: boolean;
  onSubmit: (newAccount: Partial<ManagedUserVM>) => void;
  outcome: WorkflowOutcome;
  registerError?: OncoKBError;
  registerStatus: RegisterStatus;
};

enum RegisterStatus {
  REGISTERED = 'REGISTERED',
  NOT_SUCCESS = 'NOT_SUCCESS',
  NA = 'NA',
}

function getInquiryMailto(title: string) {
  return `mailto:${ONCOKB_LICENSE_EMAIL}?subject=${encodeURIComponent(title)}`;
}

const RegistrationOutcomePanel: React.FC<RegistrationOutcomePanelProps> = ({
  defaultLicense,
  isLargeScreen,
  onSubmit,
  outcome,
  registerError,
  registerStatus,
}) => {
  return (
    <>
      <h2 className="h4 mb-3">{outcome.title}</h2>
      <p className="text-muted mb-4">{outcome.description}</p>
      {registerStatus === RegisterStatus.REGISTERED ? (
        <Alert variant="info">Registered</Alert>
      ) : null}
      {registerError ? <ErrorAlert error={registerError} /> : null}
      <WorkflowAccountRegistrationForm
        defaultLicense={defaultLicense}
        isLargeScreen={isLargeScreen}
        onSubmit={onSubmit}
      />
    </>
  );
};

export const RegisterWorkflowOutcomeForm: React.FC<RegisterWorkflowOutcomeFormProps> = ({
  isLargeScreen,
  outcome,
}) => {
  const [registerStatus, setRegisterStatus] = useState(RegisterStatus.NA);
  const [registerError, setRegisterError] = useState<OncoKBError | undefined>(
    undefined
  );

  useEffect(() => {
    setRegisterStatus(RegisterStatus.NA);
    setRegisterError(undefined);
  }, [outcome?.id]);

  const handleValidSubmit = (newAccount: Partial<ManagedUserVM>) => {
    client
      .createUserUsingPOST({
        managedUserVm: {
          ...newAccount,
          // The server ignores the password on this endpoint, but the model requires it.
          password: 'test',
        } as ManagedUserVM,
      })
      .then(
        () => {
          setRegisterStatus(RegisterStatus.REGISTERED);
          setRegisterError(undefined);
          window.scrollTo(0, 0);
        },
        (error: OncoKBError) => {
          setRegisterStatus(RegisterStatus.NOT_SUCCESS);
          setRegisterError(error);
          window.scrollTo(0, 0);
        }
      );
  };

  if (!outcome) {
    return (
      <div className="text-muted">
        Complete the workflow to reach a terminal outcome.
      </div>
    );
  }

  switch (outcome.id) {
    case 'outcome-free-academic':
      return (
        <RegistrationOutcomePanel
          defaultLicense={LicenseType.ACADEMIC}
          isLargeScreen={isLargeScreen}
          onSubmit={handleValidSubmit}
          outcome={outcome}
          registerError={registerError}
          registerStatus={registerStatus}
        />
      );
    case 'outcome-free-manual':
    case 'outcome-free-tumor-board':
      return (
        <WorkflowOnlyOutcomeForm
          title={outcome.title}
          body={
            <>
              <p>{outcome.description}</p>
              <p className="mb-0">
                This free-license path now has a dedicated workflow end-state
                component, but the final registration field set for this outcome
                has not been approved yet.
              </p>
            </>
          }
        />
      );
    case 'outcome-license-model':
    case 'outcome-contact-academic':
    case 'outcome-license-api':
    case 'outcome-license-manual-report':
      return (
        <WorkflowOnlyOutcomeForm
          title={outcome.title}
          body={
            <>
              <p>{outcome.description}</p>
              <p className="mb-0">
                This outcome needs team follow-up rather than an automated
                account-registration submission path in the current product.
              </p>
            </>
          }
          ctaHref={getInquiryMailto(outcome.title)}
          ctaLabel="Contact the OncoKB team"
        />
      );
    case 'outcome-existing-license':
      return (
        <>
          <h2 className="h4 mb-3">{outcome.title}</h2>
          <p className="text-muted mb-4">{outcome.description}</p>
          <ExistingOrganizationLicenseForm />
        </>
      );
    case 'outcome-commercial':
      return (
        <RegistrationOutcomePanel
          defaultLicense={LicenseType.COMMERCIAL}
          isLargeScreen={isLargeScreen}
          onSubmit={handleValidSubmit}
          outcome={outcome}
          registerError={registerError}
          registerStatus={registerStatus}
        />
      );
    default:
      return null;
  }
};
