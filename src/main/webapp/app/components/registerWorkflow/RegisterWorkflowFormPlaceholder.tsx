import React from 'react';
import { WorkflowOutcome } from './registerWorkflowData';

type RegisterWorkflowFormPlaceholderProps = {
  outcome?: WorkflowOutcome;
};

type ExistingLicenseOption = {
  description: string;
  label: string;
};

function getExistingLicenseOption(
  outcome: WorkflowOutcome
): ExistingLicenseOption | undefined {
  switch (outcome.id) {
    case 'outcome-existing-license':
      return {
        label: 'Use existing organization license path',
        description:
          'Placeholder only: this will become the streamlined registration flow for users whose company or hospital already has a license.',
      };
    case 'outcome-license-api':
    case 'outcome-license-manual-report':
      return {
        label: 'Our hospital already has a license',
        description:
          'Placeholder only: reuse the existing licensed-hospital path instead of collecting the full new-license request.',
      };
    case 'outcome-commercial':
      return {
        label: 'Our company already has a license',
        description:
          'Placeholder only: reserve a streamlined path for users joining an existing licensed company.',
      };
    default:
      return undefined;
  }
}

export const RegisterWorkflowFormPlaceholder: React.FC<RegisterWorkflowFormPlaceholderProps> = ({
  outcome,
}) => {
  const existingLicenseOption = outcome
    ? getExistingLicenseOption(outcome)
    : undefined;

  return (
    <div className="border rounded bg-white p-4 shadow-sm h-100">
      <div className="text-uppercase text-muted small mb-2">Registration</div>
      {outcome ? (
        <>
          <h2 className="h4 mb-3">{outcome.title}</h2>
          {existingLicenseOption ? (
            <div className="border rounded p-3 mb-3">
              <div className="font-weight-bold mb-2">
                Existing license option
              </div>
              <button
                type="button"
                className="w-100 text-left border rounded bg-white px-3 py-3 mb-2"
                style={{ cursor: 'default' }}
              >
                <div className="font-weight-bold mb-1">
                  {existingLicenseOption.label}
                </div>
                <div className="text-muted small">
                  {existingLicenseOption.description}
                </div>
              </button>
            </div>
          ) : null}
          <div className="border rounded bg-light p-3">
            <div className="font-weight-bold mb-2">Placeholder form area</div>
            <div className="text-muted small">
              Final phase-specific fields and submission behavior will be added
              in a later phase.
            </div>
          </div>
        </>
      ) : (
        <div className="text-muted">
          Complete the workflow to reach a terminal outcome. The placeholder
          form area for that path will appear here.
        </div>
      )}
    </div>
  );
};
