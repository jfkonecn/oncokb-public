export type WorkflowStepId =
  | 'step-1'
  | 'step-academic'
  | 'step-academic-model'
  | 'step-hospital'
  | 'step-hospital-reporting';

export type WorkflowOutcomeId =
  | 'outcome-existing-license'
  | 'outcome-free-academic'
  | 'outcome-license-model'
  | 'outcome-contact-academic'
  | 'outcome-free-manual'
  | 'outcome-free-tumor-board'
  | 'outcome-license-api'
  | 'outcome-license-manual-report'
  | 'outcome-commercial';

export type WorkflowNodeId = WorkflowStepId | WorkflowOutcomeId;

export type WorkflowChoice = {
  description?: string;
  label: string;
  next: WorkflowNodeId;
};

export type WorkflowStep = {
  choices: WorkflowChoice[];
  id: WorkflowStepId;
  question: string;
  stepNumber: 1 | 2 | 3;
};

export type OutcomeTone = 'free' | 'license' | 'contact' | 'restricted';

export type WorkflowOutcome = {
  badge: string;
  description: string;
  id: WorkflowOutcomeId;
  placeholderBody: string;
  placeholderTitle: string;
  title: string;
  tone: OutcomeTone;
};

export const WORKFLOW_STEPS: Record<WorkflowStepId, WorkflowStep> = {
  'step-1': {
    id: 'step-1',
    stepNumber: 1,
    question: 'Where will you be based when using OncoKB?',
    choices: [
      {
        label: 'Academic institution',
        description: 'University, research institute, or similar',
        next: 'step-academic',
      },
      {
        label: 'Hospital or clinical setting',
        description: 'Patient-facing healthcare organization',
        next: 'step-hospital',
      },
      {
        label: 'Commercial / industry',
        description: 'Biotech, pharma, software, or other for-profit',
        next: 'outcome-commercial',
      },
      {
        label: 'My Organization Already Has a License',
        next: 'outcome-existing-license',
      },
    ],
  },
  'step-academic': {
    id: 'step-academic',
    stepNumber: 2,
    question: 'Do you plan to use OncoKB for research purposes only?',
    choices: [
      {
        label: 'Yes',
        description: 'Research use only',
        next: 'outcome-free-academic',
      },
      {
        label: 'No',
        description: 'There are other purposes',
        next: 'step-academic-model',
      },
    ],
  },
  'step-academic-model': {
    id: 'step-academic-model',
    stepNumber: 3,
    question:
      'Do you plan to incorporate OncoKB data to train a machine learning model?',
    choices: [
      {
        label: 'Yes',
        description: 'Using OncoKB data as training input',
        next: 'outcome-license-model',
      },
      {
        label: 'No',
        description: 'Other non-research academic use',
        next: 'outcome-contact-academic',
      },
    ],
  },
  'step-hospital': {
    id: 'step-hospital',
    stepNumber: 2,
    question: 'How do you plan to use OncoKB in your clinical setting?',
    choices: [
      {
        label: 'Clinical reporting',
        description: 'Annotating or generating clinical reports',
        next: 'step-hospital-reporting',
      },
      {
        label: 'Manual look-up only',
        description: 'Understanding results, not integrating into reports',
        next: 'outcome-free-manual',
      },
      {
        label: 'Tumor board discussions',
        description: 'Case discussions, no report integration',
        next: 'outcome-free-tumor-board',
      },
    ],
  },
  'step-hospital-reporting': {
    id: 'step-hospital-reporting',
    stepNumber: 3,
    question:
      'How do you plan to incorporate OncoKB annotations into clinical reports?',
    choices: [
      {
        label: 'Via the API',
        description: 'Programmatic integration into reporting systems',
        next: 'outcome-license-api',
      },
      {
        label: 'Manually',
        description: 'Copying or referencing OncoKB data in reports',
        next: 'outcome-license-manual-report',
      },
    ],
  },
};

export const WORKFLOW_OUTCOMES: Record<WorkflowOutcomeId, WorkflowOutcome> = {
  'outcome-existing-license': {
    id: 'outcome-existing-license',
    tone: 'contact',
    badge: 'Existing license',
    title: 'Complete the existing organization license registration form',
    description:
      'If your company or hospital already has a license, use the existing-license path instead of starting a new license request.',
    placeholderTitle: 'Existing organization license placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the streamlined end-state for users joining an organization that already has an OncoKB license.',
  },
  'outcome-free-academic': {
    id: 'outcome-free-academic',
    tone: 'free',
    badge: 'Free license',
    title: 'Complete the academic license registration form',
    description:
      'OncoKB is free for academic research use. Register on the OncoKB website to receive your API token and access the full dataset.',
    placeholderTitle: 'Academic research registration placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the final registration form area for the academic research path.',
  },
  'outcome-license-model': {
    id: 'outcome-license-model',
    tone: 'license',
    badge: 'License required',
    title: 'Complete the model training license registration form',
    description:
      'Incorporating OncoKB data to train ML models requires a license agreement regardless of institutional affiliation. Please contact the OncoKB team to discuss terms.',
    placeholderTitle: 'Model training contact placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the end-state form area for the model-training licensing workflow.',
  },
  'outcome-contact-academic': {
    id: 'outcome-contact-academic',
    tone: 'contact',
    badge: 'Contact required',
    title: 'Complete the academic contact registration form',
    description:
      'Your use case falls outside the standard academic research license. Our team can help determine the right license for your situation.',
    placeholderTitle: 'Academic contact placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the end-state structure for academic use cases that need follow-up from the team.',
  },
  'outcome-free-manual': {
    id: 'outcome-free-manual',
    tone: 'free',
    badge: 'Free license',
    title: 'Complete the manual look-up license registration form',
    description:
      'Manually reviewing OncoKB to understand clinical results at any volume qualifies for a free license. Register to get full access.',
    placeholderTitle: 'Manual clinical look-up placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the final registration form area for manual clinical look-up access.',
  },
  'outcome-free-tumor-board': {
    id: 'outcome-free-tumor-board',
    tone: 'free',
    badge: 'Free license',
    title: 'Complete the tumor board license registration form',
    description:
      'Using OncoKB to support tumor board case discussions without integrating data directly into clinical reports qualifies for a free license.',
    placeholderTitle: 'Tumor board placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the final registration form area for the tumor board workflow.',
  },
  'outcome-license-api': {
    id: 'outcome-license-api',
    tone: 'license',
    badge: 'License required',
    title:
      'Complete the API-based clinical reporting license registration form',
    description:
      'Integrating OncoKB via the API into clinical reports requires a license agreement. Please contact our team to discuss terms and pricing.',
    placeholderTitle: 'API reporting placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the end-state form area for API-based clinical reporting.',
  },
  'outcome-license-manual-report': {
    id: 'outcome-license-manual-report',
    tone: 'license',
    badge: 'License required',
    title: 'Complete the clinical report integration license registration form',
    description:
      'Manually incorporating OncoKB annotations into clinical reports requires a license agreement. Please reach out to our team to get started.',
    placeholderTitle: 'Manual report integration placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the end-state form area for manual clinical report integration.',
  },
  'outcome-commercial': {
    id: 'outcome-commercial',
    tone: 'restricted',
    badge: 'License required',
    title: 'Complete the commercial license registration form',
    description:
      'All uses of OncoKB data at commercial or industry organizations require a license agreement. Some use cases may not be permitted. Please contact our team to discuss your specific situation and determine eligibility.',
    placeholderTitle: 'Commercial licensing placeholder',
    placeholderBody:
      'Phase one only: this placeholder reserves the end-state structure for commercial licensing follow-up.',
  },
};

export const OUTCOME_VARIANTS: Record<
  OutcomeTone,
  'success' | 'warning' | 'info' | 'danger'
> = {
  free: 'success',
  license: 'warning',
  contact: 'info',
  restricted: 'danger',
};
