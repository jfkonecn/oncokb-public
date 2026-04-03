import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import autobind from 'autobind-decorator';
import { Col, Row, Container } from 'react-bootstrap';
import { RouterStore } from 'mobx-react-router';
import { Link } from 'react-router-dom';
import { PAGE_ROUTE } from 'app/config/constants';
import WindowStore from 'app/store/WindowStore';
import SmallPageContainer from 'app/components/SmallPageContainer';
import { RegisterWorkflow } from 'app/components/registerWorkflow/RegisterWorkflow';
import { RegisterWorkflowFormPlaceholder } from 'app/components/registerWorkflow/RegisterWorkflowFormPlaceholder';
import {
  WORKFLOW_OUTCOMES,
  WORKFLOW_STEPS,
  WorkflowNodeId,
  WorkflowOutcomeId,
  WorkflowStepId,
} from 'app/components/registerWorkflow/registerWorkflowData';
import { OutcomeActions } from 'app/components/registerWorkflow/OutcomeActions';

const WORKFLOW_QUERY_PARAM = 'workflow';

export type IRegisterProps = {
  routing?: RouterStore;
  windowStore: WindowStore;
};

@inject('routing', 'windowStore')
@observer
export class RegisterPage extends React.Component<IRegisterProps> {
  @computed
  get backUrl() {
    const previousNode = this.getPreviousNode(this.currentNode);
    return previousNode ? this.getNodeUrl(previousNode) : undefined;
  }

  @computed
  get restartUrl() {
    return this.getNodeUrl(undefined);
  }

  @computed
  get currentStep() {
    return this.isStep(this.currentNode)
      ? WORKFLOW_STEPS[this.currentNode]
      : undefined;
  }

  @computed
  get currentOutcome() {
    return this.isOutcome(this.currentNode)
      ? WORKFLOW_OUTCOMES[this.currentNode]
      : undefined;
  }

  @computed
  get canGoBack() {
    return this.currentNode !== 'step-1';
  }

  @computed
  get canStartOver() {
    return this.currentNode !== 'step-1';
  }

  @computed
  get currentNode(): WorkflowNodeId {
    const searchParams = new URLSearchParams(this.locationSearch);
    const queryNode = searchParams.get(WORKFLOW_QUERY_PARAM);
    return this.isWorkflowNode(queryNode) ? queryNode : 'step-1';
  }

  @computed
  get locationSearch() {
    return this.props.routing?.location.search ?? window.location.search;
  }

  @computed
  get progressLabel() {
    return this.currentStep
      ? `Step ${this.currentStep.stepNumber} of 3`
      : 'Complete';
  }

  @computed
  get progressNow() {
    return this.currentStep
      ? Math.round((this.currentStep.stepNumber / 3) * 100)
      : 100;
  }

  isStep(node: WorkflowNodeId): node is WorkflowStepId {
    return node in WORKFLOW_STEPS;
  }

  isOutcome(node: WorkflowNodeId): node is WorkflowOutcomeId {
    return node in WORKFLOW_OUTCOMES;
  }

  isWorkflowNode(node: string | null): node is WorkflowNodeId {
    if (!node) {
      return false;
    }
    return (
      this.isStep(node as WorkflowNodeId) ||
      this.isOutcome(node as WorkflowNodeId)
    );
  }

  getPreviousNode(node: WorkflowNodeId): WorkflowNodeId | undefined {
    if (node === 'step-1') {
      return undefined;
    }
    for (const step of Object.values(WORKFLOW_STEPS)) {
      if (step.choices.some(choice => choice.next === node)) {
        return step.id;
      }
    }
    return undefined;
  }

  getWorkflowLocation(nextNode?: WorkflowNodeId) {
    const pathname =
      this.props.routing?.location.pathname ?? window.location.pathname;
    const hash = this.props.routing?.location.hash ?? window.location.hash;
    const searchParams = new URLSearchParams(this.locationSearch);
    if (nextNode && nextNode !== 'step-1') {
      searchParams.set(WORKFLOW_QUERY_PARAM, nextNode);
    } else {
      searchParams.delete(WORKFLOW_QUERY_PARAM);
    }
    const search = searchParams.toString();
    return {
      pathname,
      search: search ? `?${search}` : '',
      hash,
    };
  }

  @autobind
  getNodeUrl(nextNode?: WorkflowNodeId) {
    const location = this.getWorkflowLocation(nextNode);
    return `${location.pathname}${location.search}${location.hash}`;
  }

  render() {
    return !this.currentOutcome ? (
      <SmallPageContainer>
        <Row className="mb-3"></Row>
        <Row>
          <Col>
            <RegisterWorkflow
              backUrl={this.backUrl}
              canGoBack={this.canGoBack}
              canStartOver={this.canStartOver}
              currentStep={this.currentStep}
              getNodeUrl={this.getNodeUrl}
              restartUrl={this.restartUrl}
              progressLabel={this.progressLabel}
              progressNow={this.progressNow}
            />
          </Col>
        </Row>
      </SmallPageContainer>
    ) : (
      <Container>
        <OutcomeActions
          backUrl={this.backUrl}
          restartUrl={this.restartUrl}
          canGoBack={this.canGoBack}
          canStartOver={this.canStartOver}
        />
        <Row>
          <Col>
            <RegisterWorkflowFormPlaceholder outcome={this.currentOutcome} />
          </Col>
        </Row>
      </Container>
    );
  }
}
