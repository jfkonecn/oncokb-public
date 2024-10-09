import React, { useEffect } from 'react';
import { AppConfig } from 'app/appConfig';
import ReactGA from 'react-ga4';
import { Button } from 'reactstrap';
import { COLOR_DARK_BLUE } from 'app/config/theme';

export default function TrackingOptOut(): JSX.Element {
  useEffect(() => {
    // Install Google Analytics 4 if GA project id is configured on server side
    if (AppConfig.serverConfig?.googleAnalyticsProjectId) {
      ReactGA.initialize(AppConfig.serverConfig.googleAnalyticsProjectId);
    }
  }, [AppConfig.serverConfig]);

  return (
    <div
      className="fixed-bottom border d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#FFF',
        border: COLOR_DARK_BLUE,
        color: '#000',
      }}
    >
      <div
        className="d-flex justify-content-between flex-wrap p-2 align-items-center flex-grow-1"
        style={{
          maxWidth: '50rem',
        }}
      >
        <div className="p-2">We track to enhance our user experience</div>
        <div className="d-flex flex-wrap p-2" style={{ gap: '1rem' }}>
          <Button color="primary">Accept</Button>
          <Button>Decline</Button>
        </div>
      </div>
    </div>
  );
}
