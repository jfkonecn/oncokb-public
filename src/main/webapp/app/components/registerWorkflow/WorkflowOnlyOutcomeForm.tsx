import React from 'react';
import { LicenseInquireLink } from 'app/shared/links/LicenseInquireLink';

type WorkflowOnlyOutcomeFormProps = {
  body: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  title: string;
};

export const WorkflowOnlyOutcomeForm: React.FC<WorkflowOnlyOutcomeFormProps> = ({
  body,
  ctaHref,
  ctaLabel,
  title,
}) => {
  return (
    <>
      <h2 className="h4 mb-3">{title}</h2>
      <div className="text-muted mb-4">{body}</div>
      {ctaHref && ctaLabel ? (
        <a
          className="btn btn-primary"
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </a>
      ) : null}
      {!ctaHref ? (
        <p className="small text-muted mb-0">
          This end state is intentionally not wired to a backend registration
          flow until the final product behavior is approved.
        </p>
      ) : (
        <p className="small text-muted mt-3 mb-0">
          If you need help before reaching out, contact <LicenseInquireLink />.
        </p>
      )}
    </>
  );
};
