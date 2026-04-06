import React, { useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Alert, Button } from 'react-bootstrap';
import {
  EMAIL_VAL,
  SHORT_TEXT_VAL,
  TEXT_VAL,
} from 'app/shared/utils/FormValidationUtils';

export const ExistingOrganizationLicenseForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="border rounded bg-white p-4 shadow-sm">
      <h2 className="h4 mb-3">
        Complete the existing organization license registration form
      </h2>
      <p className="text-muted mb-4">
        If your company or hospital already has a license, provide your details
        below so this workflow can collect the core information for that path.
      </p>
      <Alert variant="info">
        This form currently validates and captures the existing-license path in
        the workflow UI. Backend submission for this path is still pending.
      </Alert>
      {submitted ? (
        <Alert variant="success">
          Existing organization license form submitted.
        </Alert>
      ) : null}
      <AvForm onValidSubmit={() => setSubmitted(true)}>
        <AvField name="email" label="Email" type="email" validate={EMAIL_VAL} />
        <AvField
          name="firstName"
          label="First Name"
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
          label="Last Name"
          validate={{
            required: {
              value: true,
              errorMessage: 'Your last name is required.',
            },
            ...SHORT_TEXT_VAL,
          }}
        />
        <AvField
          name="city"
          label="City"
          validate={{
            required: {
              value: true,
              errorMessage: 'Please let us know where you are located.',
            },
            ...TEXT_VAL,
          }}
        />
        <AvField
          name="country"
          label="Country"
          validate={{
            required: {
              value: true,
              errorMessage: 'Please let us know where you are located.',
            },
            ...TEXT_VAL,
          }}
        />
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </AvForm>
    </div>
  );
};
