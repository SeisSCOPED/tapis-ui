import React, { useState } from 'react';
import { Sidebar } from 'tapis-app/_components';
import { Router } from 'tapis-app/_Router';
import { PageLayout } from 'tapis-ui/_common';
import { NotificationsProvider } from 'tapis-app/_components/Notifications';
import { useHistory, Link } from 'react-router-dom';
import './Layout.scss';
import { useTapisConfig } from 'tapis-hooks';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Layout: React.FC = () => {
  const { claims } = useTapisConfig();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const header = (
    <div className="tapis-ui__header">
      <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <div>
          <img
            src="https://raw.githubusercontent.com/jaeestee/tapis-ui/main/public/SCOPED_Logo.ico"
            alt="SCOPED Logo"
          />{' '}
          SCOPED
        </div>
      </Link>
      <div>
        {claims['sub'] && (
          <ButtonDropdown
            size="sm"
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            className="dropdown-button"
          >
            <DropdownToggle caret>{claims['sub']}</DropdownToggle>
            <DropdownMenu style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
              <DropdownItem onClick={() => history.push('/logout')}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        )}
      </div>
    </div>
  );

  const workbenchContent = (
    <div className="workbench-content">
      <Router />
    </div>
  );

  return (
    <NotificationsProvider>
      <div style={{ display: 'flex', flexGrow: 1, height: '100vh' }}>
        <PageLayout top={header} left={<Sidebar />} right={workbenchContent} />
      </div>
    </NotificationsProvider>
  );
};

export default Layout;
