import React, { useEffect } from 'react';
import { AppConfig } from 'app/appConfig';
import ReactGA from 'react-ga4';
import { Button } from 'reactstrap';
import { COLOR_DARK_BLUE } from 'app/config/theme';
import { Observer } from 'mobx-react';
import { Stores } from 'app/App';
import { UserDTO } from 'app/shared/api/generated/API';

type ITrackingOptOut = {
  user: UserDTO | undefined;
};
function TrackingOptOutBase({ user }: ITrackingOptOut): JSX.Element {
  useEffect(() => {
    // Install Google Analytics 4 if GA project id is configured on server side
    if (AppConfig.serverConfig?.googleAnalyticsProjectId) {
      ReactGA.initialize(AppConfig.serverConfig.googleAnalyticsProjectId);
    }
  }, [AppConfig.serverConfig]);

  useEffect(() => {}, []);

  return (
    <div
      className="fixed-bottom border d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#FFF',
        border: COLOR_DARK_BLUE,
        color: '#000',
      }}
    >
      <div>{user === undefined ? 'undefined' : user?.login}</div>
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
export default function TrackingOptOut() {
  // Using observer component so that react hooks can be used
  // The mobx-react version needs to be upgraded in order to use the observe function
  return (
    <Observer
      inject={({ authenticationStore }: Stores) => {
        return { user: authenticationStore.account };
      }}
    >
      {
        (((props: ITrackingOptOut) =>
          TrackingOptOutBase(props)) as unknown) as () => React.ReactNode
      }
    </Observer>
  );
  // return <div>test</div>;
}
// export default observer(TrackingOptOut));
// export default inject(() => ({}))(observer(TrackingOptOut));
// export default inject(() => ({}))(TrackingOptOut);
