import React from 'react';
import { WorkflowChoice, WorkflowStep } from './registerWorkflowData';
import { OutcomeActions } from './OutcomeActions';

type RegisterWorkflowProps = {
  backUrl?: string;
  canGoBack: boolean;
  canStartOver: boolean;
  currentStep?: WorkflowStep;
  getNodeUrl: (nextNode: WorkflowChoice['next']) => string;
  restartUrl: string;
  progressLabel: string;
  progressNow: number;
};

type RegisterWorkflowChoiceProps = {
  choice: WorkflowChoice;
  getNodeUrl: (nextNode: WorkflowChoice['next']) => string;
};

const RegisterWorkflowChoice: React.FC<RegisterWorkflowChoiceProps> = ({
  choice,
  getNodeUrl,
}) => {
  return (
    <a
      href={getNodeUrl(choice.next)}
      className="d-block w-100 text-left border rounded bg-white px-3 py-3 mb-3 text-decoration-none"
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="pr-3">
          <div className="font-weight-bold">{choice.label}</div>
          {choice.description ? (
            <div className="text-muted small mt-1">{choice.description}</div>
          ) : null}
        </div>
        <div className="text-muted">&rsaquo;</div>
      </div>
    </a>
  );
};

export const RegisterWorkflow: React.FC<RegisterWorkflowProps> = props => {
  const { currentStep } = props;

  return (
    <div className="border rounded bg-white p-4 shadow-sm h-100">
      <div className="text-uppercase text-muted small mb-2">Registration</div>
      <h2 className="h4 mb-2">Register for an Account</h2>
      <p className="text-muted mb-4">Tell us more about yourself</p>
      <div className="mb-4">
        <div className="d-flex justify-content-between text-muted small mb-2">
          <span>Progress</span>
          <span>{props.progressLabel}</span>
        </div>
        <div className="progress" style={{ height: '0.4rem' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${props.progressNow}%` }}
            aria-valuenow={props.progressNow}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
      {currentStep ? (
        <>
          <h3 className="h5 mb-4">{currentStep.question}</h3>
          {currentStep.choices.map(choice => (
            <RegisterWorkflowChoice
              key={`${currentStep.id}-${choice.label}`}
              choice={choice}
              getNodeUrl={props.getNodeUrl}
            />
          ))}
        </>
      ) : null}
      {(props.canGoBack || props.canStartOver) && (
        <OutcomeActions
          backUrl={props.backUrl}
          restartUrl={props.restartUrl}
          canGoBack={props.canGoBack}
          canStartOver={props.canStartOver}
        />
      )}
    </div>
  );
};
