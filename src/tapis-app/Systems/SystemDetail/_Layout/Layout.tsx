import { SystemDetail } from 'tapis-ui/components/systems';
import { PageLayout, LayoutHeader } from 'tapis-ui/_common';
import SystemLayoutToolbar from './SystemLayoutToolbar';

const Layout: React.FC<{ systemId: string }> = ({ systemId }) => {
  const header = (
    <LayoutHeader type={'sub-header'}>System Details
    <SystemLayoutToolbar/>
    </LayoutHeader>
  );

  const body = (
    <div style={{ flex: 1 }}>
      <SystemDetail systemId={systemId}></SystemDetail>
    </div>
  );

  return <PageLayout top={header} right={body}></PageLayout>;
};

export default Layout;
